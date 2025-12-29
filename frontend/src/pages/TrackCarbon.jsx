import React, { useState, useEffect } from 'react'
import { HomeIcon, Leaf, Calculator, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

export default function TrackCarbon() {
  const [formData, setFormData] = useState({
    Body_Type: '',
    Sex: '',
    Diet: '',
    How_Often_Shower: '',
    Heating_Energy_Source: '',
    Transport: '',
    Vehicle_Type: null,
    Social_Activity: '',
    Monthly_Grocery_Bill: '',
    Frequency_of_Traveling_by_Air: '',
    Vehicle_Monthly_Distance_Km: '',
    Waste_Bag_Size: '',
    Waste_Bag_Weekly_Count: '',
    How_Long_TV_PC_Daily_Hour: '',
    How_Many_New_Clothes_Monthly: '',
    How_Long_Internet_Daily_Hour: '',
    Energy_efficiency: '',
    Recycle_Plastic: 0,
    Recycle_Glass: 0,
    Recycle_Paper: 0,
    Recycle_Metal: 0,
    Cook_Oven: 0,
    Cook_Airfryer: 0,
    Cook_Grill: 0,
    Cook_Microwave: 0,
    Cook_Stove: 0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked ? 1 : 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : (type === 'number' ? parseFloat(value) || 0 : value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const username = localStorage.getItem('username'); // Get logged in user

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optional: Auth Token bhej sakte hain agar secure karna hai endpoint ko
        },
        body: JSON.stringify({
          ...formData,
          user_id: username, // Send username to save history
          Vehicle_Type: formData.Transport === 'public' ? null : formData.Vehicle_Type,
          Monthly_Grocery_Bill: parseFloat(formData.Monthly_Grocery_Bill) || 0,
          Vehicle_Monthly_Distance_Km: parseFloat(formData.Vehicle_Monthly_Distance_Km) || 0,
          Waste_Bag_Weekly_Count: parseInt(formData.Waste_Bag_Weekly_Count) || 0,
          How_Long_TV_PC_Daily_Hour: parseFloat(formData.How_Long_TV_PC_Daily_Hour) || 0,
          How_Many_New_Clothes_Monthly: parseInt(formData.How_Many_New_Clothes_Monthly) || 0,
          How_Long_Internet_Daily_Hour: parseFloat(formData.How_Long_Internet_Daily_Hour) || 0
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data.predicted_carbon_footprint);
    } catch (err) {
      setError('Failed to calculate carbon footprint. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCarbonLevel = (footprint) => {
    if (footprint < 1000) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (footprint < 2000) return { level: 'Good', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (footprint < 3000) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Carbon Footprint</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your environmental impact and discover ways to reduce your carbon footprint for a more sustainable future.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-semibold">1</span>
                </div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                  <select
                    name="Body_Type"
                    value={formData.Body_Type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select body type</option>
                    <option value="underweight">Underweight</option>
                    <option value="normal">Normal</option>
                    <option value="overweight">Overweight</option>
                    <option value="obese">Obese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <select
                    name="Sex"
                    value={formData.Sex}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-semibold">2</span>
                </div>
                Lifestyle & Habits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
                  <select
                    name="Diet"
                    value={formData.Diet}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select diet type</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="omnivore">Omnivore</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How Often Do You Shower?</label>
                  <select
                    name="How_Often_Shower"
                    value={formData.How_Often_Shower}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="twice a day">Twice a day</option>
                    <option value="more frequently">More frequently</option>
                    <option value="less frequently">Less frequently</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Activity</label>
                  <select
                    name="Social_Activity"
                    value={formData.Social_Activity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="never">Never</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="often">Often</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Grocery Bill ($)</label>
                  <input
                    type="number"
                    name="Monthly_Grocery_Bill"
                    value={formData.Monthly_Grocery_Bill}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., 230"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Energy & Home */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-semibold">3</span>
                </div>
                Energy & Home
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heating Energy Source</label>
                  <select
                    name="Heating_Energy_Source"
                    value={formData.Heating_Energy_Source}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select energy source</option>
                    <option value="natural gas">Natural Gas</option>
                    <option value="electricity">Electricity</option>
                    <option value="wood">Wood</option>
                    <option value="coal">Coal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Energy Efficiency</label>
                  <select
                    name="Energy_efficiency"
                    value={formData.Energy_efficiency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Sometimes">Sometimes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TV/PC Daily Hours</label>
                  <input
                    type="number"
                    step="0.1"
                    name="How_Long_TV_PC_Daily_Hour"
                    value={formData.How_Long_TV_PC_Daily_Hour}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., 7"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Internet Daily Hours</label>
                  <input
                    type="number"
                    step="0.1"
                    name="How_Long_Internet_Daily_Hour"
                    value={formData.How_Long_Internet_Daily_Hour}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., 26"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-semibold">4</span>
                </div>
                Transportation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Transport</label>
                  <select
                    name="Transport"
                    value={formData.Transport}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select transport type</option>
                    <option value="public">Public Transport</option>
                    <option value="private">Private Vehicle</option>
                    <option value="walk/bicycle">Walk/Bicycle</option>
                  </select>
                </div>
                {formData.Transport === 'private' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                    <select
                      name="Vehicle_Type"
                      value={formData.Vehicle_Type || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                    >
                      <option value="">Select vehicle type</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="lpg">LPG</option>
                      <option value="electric">Electric</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Monthly Distance (km)</label>
                  <input
                    type="number"
                    name="Vehicle_Monthly_Distance_Km"
                    value={formData.Vehicle_Monthly_Distance_Km}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., 210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Air Travel Frequency</label>
                  <select
                    name="Frequency_of_Traveling_by_Air"
                    value={formData.Frequency_of_Traveling_by_Air}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="never">Never</option>
                    <option value="rarely">Rarely</option>
                    <option value="frequently">Frequently</option>
                    <option value="very frequently">Very Frequently</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Waste & Consumption */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-semibold">5</span>
                </div>
                Waste & Consumption
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waste Bag Size</label>
                  <select
                    name="Waste_Bag_Size"
                    value={formData.Waste_Bag_Size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    required
                  >
                    <option value="">Select bag size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra large">Extra Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Waste Bags</label>
                  <input
                    type="number"
                    name="Waste_Bag_Weekly_Count"
                    value={formData.Waste_Bag_Weekly_Count}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., 4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Clothes Monthly</label>
                  <input
                    type="number"
                    name="How_Many_New_Clothes_Monthly"
                    value={formData.How_Many_New_Clothes_Monthly}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., 1"
                    required
                  />
                </div>
              </div>

              {/* Recycling */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Recycling Habits</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'Recycle_Plastic', label: 'Plastic' },
                    { key: 'Recycle_Glass', label: 'Glass' },
                    { key: 'Recycle_Paper', label: 'Paper' },
                    { key: 'Recycle_Metal', label: 'Metal' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        checked={formData[key] === 1}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                      />
                      <label htmlFor={key} className="ml-2 text-sm font-medium text-gray-900">{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Methods */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Cooking Methods Used</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { key: 'Cook_Oven', label: 'Oven' },
                    { key: 'Cook_Airfryer', label: 'Air Fryer' },
                    { key: 'Cook_Grill', label: 'Grill' },
                    { key: 'Cook_Microwave', label: 'Microwave' },
                    { key: 'Cook_Stove', label: 'Stove' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        checked={formData[key] === 1}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                      />
                      <label htmlFor={key} className="ml-2 text-sm font-medium text-gray-900">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    <span>Calculate My Carbon Footprint</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {prediction && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="bg-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingDown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Carbon Footprint</h3>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 mb-6">
                <div className="text-5xl font-bold text-emerald-600 mb-2">
                  {prediction.toFixed(1)}
                </div>
                <div className="text-lg text-gray-600 mb-4">kg CO₂ equivalent per year</div>

                {(() => {
                  const { level, color, bg } = getCarbonLevel(prediction);
                  return (
                    <div className={`inline-flex items-center px-4 py-2 rounded-full ${bg}`}>
                      <CheckCircle className={`w-5 h-5 ${color} mr-2`} />
                      <span className={`font-semibold ${color}`}>{level}</span>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">Global Average</h4>
                  <p className="text-2xl font-bold text-blue-600">4,800 kg</p>
                  <p className="text-sm text-blue-700">CO₂ per person/year</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2">Paris Agreement Goal</h4>
                  <p className="text-2xl font-bold text-green-600">2,300 kg</p>
                  <p className="text-sm text-green-700">CO₂ per person/year</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-purple-900 mb-2">Your Impact</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {prediction < 2300 ? '✓ Below' : '✗ Above'} Goal
                  </p>
                  <p className="text-sm text-purple-700">
                    {prediction < 2300 ? 'Great job!' : 'Room for improvement'}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl text-left">
                <h4 className="font-semibold text-gray-900 mb-3">💡 Tips to Reduce Your Carbon Footprint:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Switch to renewable energy sources for heating</li>
                  <li>• Use public transportation or electric vehicles more often</li>
                  <li>• Reduce air travel and choose local destinations</li>
                  <li>• Increase recycling and choose sustainable products</li>
                  <li>• Adopt a more plant-based diet</li>
                  <li>• Improve home energy efficiency</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}