import { ArrowLeft, Camera, ChevronsRight, Eye, EyeOff, Film, Popcorn, Ticket, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentBg, setCurrentBg] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [avatar, setAvatar] = useState<string | null>(null);

  // Array of film-inspired gradient backgrounds
  const backgrounds = [
    'from-rose-900 via-red-800 to-amber-900', // Warm cinematic
    'from-emerald-900 via-teal-800 to-cyan-900', // Matrix-inspired
    'from-indigo-900 via-purple-800 to-pink-900', // Cosmic/sci-fi
    'from-amber-900 via-orange-800 to-red-900', // Action film
    'from-slate-900 via-gray-800 to-zinc-900', // Noir film
  ];

  // Background rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarUpload = () => {
    // Simulate avatar upload with a placeholder
    setAvatar("/api/placeholder/100/100");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextStep = () => {
    if (activeStep === 1) {
      if (!formData.fullName || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
      setError('');
      setActiveStep(2);
    }
  };

  const goToPreviousStep = () => {
    setActiveStep(1);
    setError('');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgrounds[currentBg]} transition-all duration-1000 flex flex-col justify-center items-center p-4 overflow-hidden`}>
      {/* Animated film elements in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <Ticket size={64} className="text-white animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute top-2/3 right-1/3 opacity-10">
          <Popcorn size={72} className="text-white animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-10">
          <Film size={56} className="text-white animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Cinematic light flares */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-500/20 blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>

      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-600 rounded-lg blur"></div>
            <div className="relative bg-black p-2.5 rounded-lg border border-amber-500/30">
              <Ticket size={24} className="text-amber-500" />
            </div>
          </div>
          <span className="text-white text-2xl font-bold tracking-wider">SCREENTIME</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Join The Movie Club</h1>
        <p className="text-gray-300 text-center max-w-md">Create your account to access exclusive screenings and offers</p>
      </div>

      <div className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/10 relative z-10">
        {/* Film strip decoration */}
        <div className="absolute -left-3 top-10 bottom-10 w-1.5 flex flex-col space-y-2">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-3 w-1.5 bg-amber-500/70 rounded-sm"></div>
          ))}
        </div>
        <div className="absolute -right-3 top-10 bottom-10 w-1.5 flex flex-col space-y-2">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-3 w-1.5 bg-amber-500/70 rounded-sm"></div>
          ))}
        </div>

        {/* Registration progress indicator */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center justify-center w-full">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-amber-600' : 'bg-gray-700'} text-white font-medium`}>1</div>
            <div className={`h-1 flex-1 mx-1 ${activeStep >= 2 ? 'bg-amber-600' : 'bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-amber-600' : 'bg-gray-700'} text-white font-medium`}>2</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-amber-300 text-sm font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="w-full bg-black/50 border border-amber-500/30 text-white rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-amber-300 text-sm font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full bg-black/50 border border-amber-500/30 text-white rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-amber-300 text-sm font-medium mb-2">
                  Profile Picture (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 bg-black/30 border border-amber-500/30 rounded-lg flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <Camera size={28} className="text-amber-500/50" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAvatarUpload}
                    className="flex items-center gap-2 bg-black/30 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-lg hover:bg-amber-950/30 transition-colors"
                  >
                    <Upload size={16} />
                    Upload Avatar
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={goToNextStep}
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white font-medium py-3.5 px-4 rounded-lg hover:from-amber-500 hover:to-red-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/30"
              >
                Continue <ChevronsRight size={18} className="ml-2" />
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-amber-300 text-sm font-medium mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-black/50 border border-amber-500/30 text-white rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-300 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1">Password must be at least 8 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-amber-300 text-sm font-medium mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full bg-black/50 border border-amber-500/30 text-white rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-300 transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-amber-500/30 bg-black/50 text-amber-500 focus:ring-amber-500/50"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-300">
                    I agree to the <a href="#" className="text-amber-400 hover:text-amber-300">Terms of Service</a> and <a href="#" className="text-amber-400 hover:text-amber-300">Privacy Policy</a>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="flex-1 border border-amber-500/30 text-white py-3 px-4 rounded-lg hover:bg-amber-900/20 transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowLeft size={18} className="mr-2" /> Back
                </button>

                <button
                  type="submit"
                  disabled={isLoading || !formData.agreeToTerms}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-red-600 text-white font-medium py-3 px-4 rounded-lg hover:from-amber-500 hover:to-red-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/30 disabled:opacity-50"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      Complete Sign Up
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-amber-500/20 w-full"></div>
            <span className="text-amber-300/70 whitespace-nowrap text-sm">ALREADY A MEMBER?</span>
            <div className="h-px bg-amber-500/20 w-full"></div>
          </div>

          <button
            onClick={() => { }}
            className="w-full border border-amber-500/30 text-white py-3 px-4 rounded-lg hover:bg-amber-900/20 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Now showing section */}
      <div className="mt-8 bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10 flex items-center gap-3 relative z-10">
        <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold text-white uppercase animate-pulse">Premieres</div>
        <div className="text-white text-sm overflow-hidden whitespace-nowrap">
          <span className="inline-block animate-marquee">
            Dune: Part Two • Gladiator II • The Batman: Vengeance • Furiosa • Mission Impossible 8 • Avatar 3 •
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;