import React, { useEffect, useState } from 'react';
import { User, History, Calendar, Mail, Lock, Settings, Trash2, Eye, X } from 'lucide-react';

export default function Profile() {
    const [history, setHistory] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '' });
    const [msg, setMsg] = useState({ type: '', text: '' });

    const [selectedHistory, setSelectedHistory] = useState(null);

    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    const fetchHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8000/history/${username}`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (err) {
            console.error("Failed to fetch history");
        }
    };

    useEffect(() => {
        if (username) fetchHistory();
    }, [username]);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:8000/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    current_password: passwordData.current_password,
                    new_password: passwordData.new_password
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMsg({ type: 'success', text: 'Password changed successfully!' });
                setPasswordData({ current_password: '', new_password: '' });
            } else {
                setMsg({ type: 'error', text: data.detail || 'Failed to change password' });
            }
        } catch (err) {
            setMsg({ type: 'error', text: 'Server error' });
        }
    };

    const handleClearHistory = async () => {
        if (!window.confirm("Are you sure you want to delete all history? This cannot be undone.")) return;

        try {
            const response = await fetch(`http://localhost:8000/history/clear/${username}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setHistory([]);
                setMsg({ type: 'success', text: 'History cleared successfully.' });
            } else {
                setMsg({ type: 'error', text: 'Failed to clear history.' });
            }
        } catch (err) {
            setMsg({ type: 'error', text: 'Server error' });
        }
    };

    return (
        <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="bg-emerald-100 p-4 rounded-full">
                            <User className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                            <p className="text-gray-500">@{username}</p>
                            <div className="flex items-center text-sm text-gray-400 mt-1">
                                <Mail className="w-4 h-4 mr-1" /> {email}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <Settings className="w-6 h-6" />
                    </button>
                </div>

                {msg.text && (
                    <div className={`p-4 rounded-lg shadow ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {msg.text}
                    </div>
                )}

                {showSettings && (
                    <div className="bg-white shadow rounded-lg p-6 animate-in slide-in-from-top-4 duration-300">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b pb-2">
                            <Settings className="w-5 h-5 mr-2 text-emerald-600" />
                            Account Settings
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                                    <Lock className="w-4 h-4 mr-2" /> Change Password
                                </h3>
                                <form onSubmit={handleChangePassword} className="space-y-3">
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        required
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        value={passwordData.new_password}
                                        onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                    />
                                    <button type="submit" className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm">
                                        Update Password
                                    </button>
                                </form>
                            </div>

                            <div>
                                <h3 className="font-medium text-red-600 mb-3 flex items-center">
                                    <Trash2 className="w-4 h-4 mr-2" /> Danger Zone
                                </h3>
                                <div className="bg-red-50 p-4 rounded-md border border-red-100">
                                    <p className="text-sm text-red-800 mb-3">
                                        Once you delete your history, there is no going back. Please be certain.
                                    </p>
                                    <button
                                        onClick={handleClearHistory}
                                        className="w-full border border-red-300 text-red-600 bg-white px-4 py-2 rounded-md hover:bg-red-50 transition text-sm flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete All History
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center border-b pb-2">
                        <History className="w-5 h-5 mr-2 text-emerald-600" />
                        Calculation History
                    </h2>
                    <div className="overflow-hidden">
                        {history.length === 0 ? (
                            <p className="text-gray-500 italic text-center py-4">No calculations found.</p>
                        ) : (
                            <div className="space-y-3">
                                {history.map((item) => (
                                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center hover:shadow-md transition-shadow">
                                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                            <div className="bg-white p-2 rounded-full border border-gray-200">
                                                <span className="text-lg font-bold text-emerald-600">
                                                    {item.carbon_value.toFixed(1)}
                                                </span>
                                                <span className="text-xs text-gray-500 block text-center">kg</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(item.timestamp).toLocaleDateString()} &nbsp;
                                                <span className="text-gray-300">|</span> &nbsp;
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        {item.details && (
                                            <button
                                                onClick={() => setSelectedHistory(item)}
                                                className="flex items-center text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Eye className="w-4 h-4 mr-1" /> View Inputs
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {selectedHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">Input Details</h3>
                            <button onClick={() => setSelectedHistory(null)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(JSON.parse(selectedHistory.details)).map(([key, value]) => (
                                    <div key={key} className="border-b border-gray-100 pb-2">
                                        <span className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            {key.replace(/_/g, ' ')}
                                        </span>
                                        <span className="block text-sm text-gray-900 font-medium">
                                            {value === null ? 'N/A' : value.toString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 border-t bg-gray-50 flex justify-end">
                            <button
                                onClick={() => setSelectedHistory(null)}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}