import React from 'react';
import { Earth, Leaf, Lightbulb, TreePine, Calculator, ArrowRight, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Earth className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About SustainaMind
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            SustainaMind empowers individuals to understand and reduce their carbon footprint using AI-powered predictions. 
            Our platform provides personalized insights based on your daily habits, energy use, diet, and transportation choices.
          </p>
         
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            SustainaMind is built with modern, scalable technologies for both speed and accuracy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Frontend</h3>
              <p className="text-gray-600">
                Built with <strong>React</strong> for a responsive and interactive user interface. Users can input lifestyle and consumption data directly in their browser.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Backend & API</h3>
              <p className="text-gray-600">
                <strong>FastAPI</strong> powers the backend, handling requests and computing predictions in real-time. No user data is stored, ensuring privacy.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Model</h3>
              <p className="text-gray-600">
                A <strong>Random Forest Regressor</strong> predicts carbon footprints based on user input. Categorical features are processed with <strong>OneHotEncoder</strong>, while numerical features are fed directly. The model averages multiple decision trees for accurate and robust predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data & AI Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">AI & Data Workflow</h2>
          <p className="text-gray-600 text-lg mb-6 text-center">
            The AI model uses a dataset of lifestyle, energy usage, diet, transportation, and waste habits. It learns how each activity contributes to an individual’s carbon footprint.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Data Processing</h3>
              <p className="text-gray-600 leading-relaxed">
                Features are divided into categorical and numerical types. List-like features (e.g., recycling items or cooking methods) are expanded into binary flags, allowing the model to interpret each action separately.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Feature Encoding</h3>
              <p className="text-gray-600 leading-relaxed">
                Categorical variables are converted using <strong>OneHotEncoder</strong>, creating columns like <em>Sex_female</em> or <em>Transport_public</em>. This ensures consistency between training and prediction.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Model Predictions</h3>
              <p className="text-gray-600 leading-relaxed">
                The <strong>Random Forest Regressor</strong> computes predictions in real-time. Each tree evaluates the input, and the final carbon footprint is the average across all trees. This provides accurate, personalized feedback instantly.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">User Interaction</h3>
              <p className="text-gray-600 leading-relaxed">
                Users input their data on the frontend, which is sent to the FastAPI backend. The backend transforms, encodes, and predicts the carbon footprint, then returns the result to the UI. This is done without storing any user data, prioritizing privacy.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Model Benefits</h3>
              <ul className="list-disc pl-6 text-gray-600 leading-relaxed">
                <li>Handles both categorical and numerical inputs efficiently.</li>
                <li>Captures non-linear interactions between features, such as diet and transportation.</li>
                <li>Robust against noisy or missing data due to tree ensemble averaging.</li>
                <li>Provides actionable insights for individual users.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Journey to a Greener Future
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Understand your carbon footprint, take action, and join millions of users making a real environmental impact.
          </p>

            {/* Write the Author Name in right corener */}
          <p className="text-sm text-emerald-100 mb-8 leading-relaxed">
            Author: Hridyanshi Jain
          </p>

        </div>
      </section>
    </div>
  );
}
