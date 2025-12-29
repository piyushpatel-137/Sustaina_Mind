import React from 'react'
import { Leaf, Calculator, TrendingDown, Earth, Recycle, Lightbulb, ArrowRight, Target, Users, TreePine } from 'lucide-react'
import { Link } from 'react-router-dom';
export default function Home() {
  const carbonFacts = [
    {
      icon: <Earth className="w-8 h-8 text-blue-500" />,
      title: "Global Impact",
      stat: "420+ ppm",
      description: "Current atmospheric CO₂ levels - the highest in 3 million years"
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-red-500" />,
      title: "Temperature Rise",
      stat: "+1.2°C",
      description: "Global temperature increase since pre-industrial times"
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Paris Goal",
      stat: "2.1 tonnes",
      description: "Per person CO₂ limit by 2030 to stay within 1.5°C target"
    }
  ];

  const sustainableTips = [
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Reduce, Reuse, Recycle",
      description: "Minimize waste by choosing reusable products and recycling materials properly"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Choose Green Energy",
      description: "Switch to renewable energy sources like solar, wind, or hydroelectric power"
    },
    {
      icon: <TreePine className="w-6 h-6" />,
      title: "Plant-Based Diet",
      description: "Reduce meat consumption - livestock accounts for 14.5% of global greenhouse gas emissions"
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Efficient Transportation",
      description: "Use public transport, cycle, walk, or choose electric vehicles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="bg-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Earth className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your Impact,
              <span className="text-emerald-600 block">Save Our Planet</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Understanding your carbon footprint is the first step toward a sustainable future. 
              Join millions taking action to reduce emissions. Protect our environment for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/track-carbon" >
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Calculator className="w-5 h-5" />
                <span>Calculate My Carbon Footprint Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
                </Link>
            <Link to={"/about"}>
              <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Facts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Climate Reality</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding the current state of our planet's climate is crucial for taking meaningful action.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {carbonFacts.map((fact, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-center mb-6">
                  {fact.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{fact.title}</h3>
                <div className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {fact.stat}
                </div>
                <p className="text-gray-600 text-center leading-relaxed">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Carbon Footprint Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What is a Carbon Footprint?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Your carbon footprint is the total amount of greenhouse gases produced by your daily activities, 
                measured in carbon dioxide equivalents (CO₂e). This includes everything from the energy you use 
                at home to the food you eat and the transportation you choose.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Direct Emissions</h4>
                    <p className="text-gray-600">From burning fossil fuels in your car, home heating, and cooking</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Indirect Emissions</h4>
                    <p className="text-gray-600">From electricity use, food production, and manufactured goods</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Average Carbon Footprints</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="font-medium">USA</span>
                  <span className="font-bold">16.0 tons/year</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="font-medium">Global Average</span>
                  <span className="font-bold">4.8 tonnes/year</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="font-medium">Paris Agreement Target</span>
                  <span className="font-bold">2.1 tonnes/year</span>
                </div>
              </div>
              <p className="text-sm mt-4 opacity-90">
                To limit global warming to 1.5°C, we need to reach net-zero emissions by 2050.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Living Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Live Sustainably</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Small changes in your daily routine can make a significant impact on reducing your carbon footprint.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sustainableTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eye-Opening Facts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Eye-Opening Facts</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Small actions have big impacts. Here's how your choices compare globally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold mb-2">1.6 tonnes</div>
              <p className="text-blue-100">CO₂ from one transatlantic flight per passenger - nearly the entire annual Paris Agreement limit</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold mb-2">27 kg CO₂</div>
              <p className="text-red-100">Emitted producing 1 kg of beef - more than driving a car for 100 km</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold mb-2">0.5 tonnes</div>
              <p className="text-green-100">CO₂ saved yearly by cycling just 5 km/day instead of driving</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold mb-2">10%</div>
              <p className="text-purple-100">Global emissions from fashion industry - more than all flights and shipping combined</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold mb-2">1 football field</div>
              <p className="text-orange-100">Equivalent forest area destroyed every second globally</p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold mb-2">100 companies</div>
              <p className="text-teal-100">Responsible for over 70% of global emissions since 1988</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Movement for a Greener Future
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Every action counts. Start measuring your carbon footprint today and discover personalized 
            ways to reduce your environmental impact. Together, we can create a sustainable future for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
              <Calculator className="w-5 h-5" />
              <span>Start Your Assessment</span>
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Explore Solutions</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Footer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">37B+</div>
              <div className="text-gray-300">Tonnes of CO₂ emitted globally yearly</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">2M+</div>
              <div className="text-gray-300">People tracking their footprint</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">Up to 75%</div>
              <div className="text-gray-300">Reduction achievable with action</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">2050</div>
              <div className="text-gray-300">Net-zero emissions target</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}