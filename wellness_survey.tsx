import React, { useState } from 'react';

// Santa Monica Proper Hotel Brand Colors and Fonts
const brandStyles = `
  @import url('https://fonts.googleapis.com/css2?family=ABCArizonaMix-Light:wght@300&display=swap');
  
  /* Brand Colors */
  :root {
    --smp-cream: #f4f2f0;
    --smp-black: #000000;
  }
  
  /* Brand Fonts */
  .smp-header {
    font-family: 'BentonSans-WideBold', 'Arial Black', sans-serif;
    font-weight: 800;
  }
  
  .smp-body {
    font-family: 'ABCArizonaMix-Light', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 300;
  }
  
  /* Santa Monica Proper Logo Styles */
  .smp-logo {
    font-family: 'BentonSans-WideBold', 'Arial Black', sans-serif;
    font-weight: 800;
    letter-spacing: 0.2em;
    color: #000000;
  }
  
  .smp-logo-main {
    font-size: 2.5rem;
    line-height: 0.9;
    margin-bottom: 0.25rem;
  }
  
  .smp-logo-sub {
    font-size: 1.2rem;
    letter-spacing: 0.3em;
  }
  
  @media (max-width: 640px) {
    .smp-logo-main {
      font-size: 1.8rem;
    }
    .smp-logo-sub {
      font-size: 0.9rem;
    }
  }
`;

const WellnessSurvey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    guestInfo: {
      names: '',
      partyType: '',
      arrivalDate: '',
      arrivalTime: '',
      lengthOfStay: '',
      departureTime: '',
      travelPurpose: ''
    },
    energyLevel: '',
    wellnessInterests: [],
    timingPreference: '',
    specialNotes: ''
  });

  const updateResponse = (key, value) => {
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateGuestInfo = (field, value) => {
    setResponses(prev => ({
      ...prev,
      guestInfo: {
        ...prev.guestInfo,
        [field]: value
      }
    }));
  };

  const toggleWellnessInterest = (value) => {
    setResponses(prev => {
      const current = prev.wellnessInterests || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return {
        ...prev,
        wellnessInterests: updated
      };
    });
  };

  const steps = [
    {
      title: "Guest Information",
      component: <GuestInfoStep 
        data={responses.guestInfo} 
        updateData={updateGuestInfo} 
      />
    },
    {
      title: "Energy Level",
      component: <EnergyLevelStep 
        selected={responses.energyLevel} 
        onSelect={(value) => updateResponse('energyLevel', value)} 
      />
    },
    {
      title: "Wellness Interests",
      component: <WellnessInterestsStep 
        selected={responses.wellnessInterests} 
        onToggle={toggleWellnessInterest} 
      />
    },
    {
      title: "Timing Preference",
      component: <TimingStep 
        selected={responses.timingPreference} 
        onSelect={(value) => updateResponse('timingPreference', value)} 
      />
    },
    {
      title: "Special Notes",
      component: <SpecialNotesStep 
        value={responses.specialNotes} 
        onChange={(value) => updateResponse('specialNotes', value)} 
      />
    },
    {
      title: "Your Personalized Itinerary",
      component: <ItineraryResults responses={responses} />
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    const step = currentStep;
    switch (step) {
      case 0: return responses.guestInfo.names && responses.guestInfo.partyType && responses.guestInfo.arrivalDate && responses.guestInfo.lengthOfStay;
      case 1: return responses.energyLevel;
      case 2: return responses.wellnessInterests.length > 0;
      case 3: return responses.timingPreference;
      case 4: return true;
      default: return true;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: brandStyles }} />
      <div className="min-h-screen smp-body" style={{ backgroundColor: '#f4f2f0', color: '#000000' }}>
        <div className="max-w-lg mx-auto min-h-screen" style={{ backgroundColor: '#f4f2f0' }}>
          {/* Header */}
          <div className="px-6 pt-9 pb-5 text-center" style={{ backgroundColor: '#f4f2f0' }}>
            <div className="text-center mb-5">
              <h1 className="smp-body text-sm tracking-widest uppercase mb-1 font-semibold" style={{ color: '#000000' }}>
                WELLNESS EXPERIENCE SURVEY
              </h1>
              
              {/* Santa Monica Proper Logo - Replace with actual logo file */}
              <div className="flex justify-center mb-5 mt-6">
                <img 
                  src="santa-monica-proper-logo.svg" 
                  alt="Santa Monica Proper Hotel"
                  className="h-16 w-auto"
                  style={{ maxHeight: '4rem' }}
                />
              </div>

              {/* Survey Purpose */}
              <div className="smp-body text-xs leading-relaxed max-w-sm mx-auto p-4 border" 
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                     borderColor: 'rgba(0, 0, 0, 0.1)',
                     color: '#000000'
                   }}>
                Help us create your personalized wellness itinerary. This brief survey will generate a detailed day-by-day schedule of activities, treatments, and dining experiences tailored to your preferences and stay.
              </div>
            </div>
            
            <p className="smp-body text-xs uppercase tracking-wide text-center" style={{ color: '#777777' }}>
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

        {/* Survey Content */}
        <div className="border mx-6 mb-6 p-6" 
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.5)', 
               borderColor: 'rgba(0, 0, 0, 0.1)' 
             }}>
          <h2 className="smp-header text-xs tracking-wide uppercase mb-5" style={{ color: '#000000' }}>
            {steps[currentStep].title}
          </h2>
          
          {steps[currentStep].component}
        </div>

        {/* Navigation */}
        <div className="flex justify-between px-6 pb-10">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`smp-body px-4 py-2 text-xs tracking-wide uppercase border transition-all duration-200 ${
              currentStep === 0 
                ? 'cursor-not-allowed' 
                : 'cursor-pointer hover:text-white'
            }`}
            style={{
              backgroundColor: currentStep === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              color: currentStep === 0 ? '#999999' : '#000000'
            }}
            onMouseEnter={(e) => {
              if (currentStep !== 0) {
                e.target.style.backgroundColor = '#000000';
                e.target.style.color = '#f4f2f0';
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== 0) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                e.target.style.color = '#000000';
              }
            }}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className={`smp-body px-4 py-2 text-xs tracking-wide uppercase border transition-all duration-200 ${
                isStepComplete() 
                  ? 'cursor-pointer hover:text-white' 
                  : 'cursor-not-allowed'
              }`}
              style={{
                backgroundColor: isStepComplete() ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                color: isStepComplete() ? '#000000' : '#999999'
              }}
              onMouseEnter={(e) => {
                if (isStepComplete()) {
                  e.target.style.backgroundColor = '#000000';
                  e.target.style.color = '#f4f2f0';
                }
              }}
              onMouseLeave={(e) => {
                if (isStepComplete()) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.color = '#000000';
                }
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                console.log('Final responses:', responses);
                alert('Thank you! Your personalized wellness itinerary has been created.');
              }}
              className="smp-body px-4 py-2 text-xs tracking-wide uppercase border cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                color: '#000000'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#000000';
                e.target.style.color = '#f4f2f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                e.target.style.color = '#000000';
              }}
            >
              Complete Survey
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

// Guest Information Component
const GuestInfoStep = ({ data, updateData }) => (
  <div className="grid grid-cols-1 gap-5">
    <div>
      <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
        Guest Name(s) *
      </label>
      <input
        type="text"
        value={data.names}
        onChange={(e) => updateData('names', e.target.value)}
        placeholder="John & Jane Smith"
        className="smp-body w-full p-3 border text-xs"
        style={{
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#000000'
        }}
      />
    </div>

    <div>
      <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
        Who are you traveling with? *
      </label>
      <select
        value={data.partyType}
        onChange={(e) => updateData('partyType', e.target.value)}
        className="smp-body w-full p-3 border text-xs"
        style={{
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#000000'
        }}
      >
        <option value="">Select...</option>
        <option value="solo">Just me</option>
        <option value="couple">My partner and I</option>
        <option value="family">My family (with kids)</option>
        <option value="friends">A group of friends</option>
        <option value="business">Business colleagues</option>
      </select>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
          Arrival Date *
        </label>
        <input
          type="date"
          value={data.arrivalDate}
          onChange={(e) => updateData('arrivalDate', e.target.value)}
          className="smp-body w-full p-3 border text-xs"
          style={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#000000'
          }}
        />
      </div>

      <div>
        <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
          Estimated Arrival Time
        </label>
        <select
          value={data.arrivalTime}
          onChange={(e) => updateData('arrivalTime', e.target.value)}
          className="smp-body w-full p-3 border text-xs"
          style={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#000000'
          }}
        >
          <option value="">Select...</option>
          <option value="early-morning">Early Morning (6-9 AM)</option>
          <option value="morning">Morning (9 AM-12 PM)</option>
          <option value="afternoon">Afternoon (12-4 PM)</option>
          <option value="evening">Evening (4-8 PM)</option>
          <option value="late-evening">Late Evening (8 PM+)</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
          Length of Stay *
        </label>
        <select
          value={data.lengthOfStay}
          onChange={(e) => updateData('lengthOfStay', e.target.value)}
          className="smp-body w-full p-3 border text-xs"
          style={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#000000'
          }}
        >
          <option value="">Select...</option>
          <option value="1">1 night</option>
          <option value="2">2 nights</option>
          <option value="3">3 nights</option>
          <option value="4">4 nights</option>
          <option value="5">5 nights</option>
          <option value="6-7">6-7 nights</option>
          <option value="week+">1 week or more</option>
        </select>
      </div>

      <div>
        <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
          Estimated Departure Time
        </label>
        <select
          value={data.departureTime}
          onChange={(e) => updateData('departureTime', e.target.value)}
          className="smp-body w-full p-3 border text-xs"
          style={{
            borderColor: 'rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#000000'
          }}
        >
          <option value="">Select...</option>
          <option value="early-morning">Early Morning (6-9 AM)</option>
          <option value="morning">Morning (9 AM-12 PM)</option>
          <option value="afternoon">Afternoon (12-4 PM)</option>
          <option value="evening">Evening (4-8 PM)</option>
          <option value="flexible">Flexible/Late Checkout</option>
        </select>
      </div>
    </div>

    <div>
      <label className="smp-header block text-xs tracking-wide uppercase mb-2" style={{ color: '#000000' }}>
        Occasion (Optional)
      </label>
      <select
        value={data.travelPurpose}
        onChange={(e) => updateData('travelPurpose', e.target.value)}
        className="smp-body w-full p-3 border text-xs"
        style={{
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#000000'
        }}
      >
        <option value="">Select...</option>
        <option value="leisure">Leisure/Vacation</option>
        <option value="business">Business Travel</option>
        <option value="anniversary">Anniversary/Romance</option>
        <option value="birthday">Birthday Celebration</option>
        <option value="wellness-retreat">Dedicated Wellness Retreat</option>
        <option value="other">Other Special Occasion</option>
      </select>
    </div>
  </div>
);

// Energy Level Component
const EnergyLevelStep = ({ selected, onSelect }) => {
  const options = [
    {
      id: 'high-activity',
      title: 'High Activity',
      description: 'I want challenging workouts, intense experiences, and active adventures',
      examples: 'HIIT, boot camp, VO2 max testing, personal training, beach sports'
    },
    {
      id: 'balanced',
      title: 'Balanced Mix',
      description: 'I want some active moments balanced with relaxing experiences',
      examples: 'Yoga classes, moderate spa treatments, pool time with light activities'
    },
    {
      id: 'restorative',
      title: 'Restorative Focus',
      description: 'I prefer gentle, calming, and deeply relaxing experiences',
      examples: 'Gentle yoga, spa treatments, meditation, peaceful recovery sessions'
    }
  ];

  return (
    <div>
      <p className="text-xs text-gray-600 leading-relaxed mb-5">
        This helps us match the right intensity level for your wellness experience:
      </p>
      <div className="grid gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`p-5 border cursor-pointer transition-all duration-200 ${
              selected === option.id 
                ? 'border-2 border-gray-900 bg-gray-900 bg-opacity-5' 
                : 'border border-gray-300 bg-white bg-opacity-50 hover:bg-gray-50'
            }`}
          >
            <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              {option.description}
            </p>
            <p className="text-xs text-gray-400 italic leading-tight">
              {option.examples}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Wellness Interests Component
const WellnessInterestsStep = ({ selected, onToggle }) => {
  const options = [
    {
      id: 'movement',
      title: 'Movement & Fitness',
      description: 'Physical activity, exercise, and fitness training',
      offerings: 'Personal training, yoga classes, HIIT, Pilates, VO2 Max testing ($150), 24/7 gym access'
    },
    {
      id: 'spa',
      title: 'Spa & Ayurvedic Treatments',
      description: 'Spa treatments and Ayurvedic wellness experiences',
      offerings: 'Surya Spa treatments (15% off for guests), Panchakarma, massage, meditation, sound baths'
    },
    {
      id: 'recovery',
      title: 'Recovery & Technology',
      description: 'Recovery, restoration, and wellness technology',
      offerings: 'Recovery Suite ($145-$345) with Ammortal Chamber, cold plunge, sauna, red light, compression therapy'
    },
    {
      id: 'outdoor',
      title: 'Outdoor & Beach Activities',
      description: 'Outdoor experiences and Santa Monica natural setting',
      offerings: 'Rooftop pool (only one on Westside), beach activities, bike rentals, outdoor yoga, sunset experiences'
    },
    {
      id: 'dining',
      title: 'Wellness Dining & Lifestyle',
      description: 'Healthy eating, Ayurvedic nutrition, and lifestyle',
      offerings: 'Proper Club Lounge ($195/day), Surya Ayurvedic lattes, wellness bowls, smoothies, seed oil-free dining at Palma & Calabra'
    }
  ];

  return (
    <div>
      <p className="text-xs text-gray-600 leading-relaxed mb-5">
        Select all wellness areas that interest you during your stay (choose multiple):
      </p>
      <div className="grid gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => onToggle(option.id)}
            className={`p-5 border cursor-pointer transition-all duration-200 ${
              selected.includes(option.id) 
                ? 'border-2 border-gray-900 bg-gray-900 bg-opacity-5' 
                : 'border border-gray-300 bg-white bg-opacity-50 hover:bg-gray-50'
            }`}
          >
            <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              {option.description}
            </p>
            <p className="text-xs text-gray-400 italic leading-tight">
              {option.offerings}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Timing Component
const TimingStep = ({ selected, onSelect }) => {
  const options = [
    {
      id: 'early-bird',
      title: 'Early Bird (6-10 AM)',
      description: 'I love starting my day with wellness activities'
    },
    {
      id: 'mid-day',
      title: 'Mid-Day (10 AM - 4 PM)',
      description: 'I prefer wellness activities during the day'
    },
    {
      id: 'evening',
      title: 'Evening (4-8 PM)',
      description: 'I like to wind down with wellness in the evening'
    },
    {
      id: 'flexible',
      title: 'Flexible Scheduling',
      description: 'I am open to activities at various times'
    }
  ];

  return (
    <div>
      <p className="text-xs text-gray-600 leading-relaxed mb-5">
        When do you prefer your wellness activities?
      </p>
      <div className="grid gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`p-4 border cursor-pointer transition-all duration-200 ${
              selected === option.id 
                ? 'border-2 border-gray-900 bg-gray-900 bg-opacity-5' 
                : 'border border-gray-300 bg-white bg-opacity-50 hover:bg-gray-50'
            }`}
          >
            <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900 mb-1">
              {option.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Special Notes Component
const SpecialNotesStep = ({ value, onChange }) => (
  <div>
    <p className="text-xs text-gray-600 leading-relaxed mb-4">
      Any special considerations or goals for your wellness experience?
    </p>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Optional - Examples:
• Dietary restrictions or preferences
• Physical limitations or injuries to consider
• Specific wellness goals
• Celebrating a special occasion
• Previous experience with Ayurveda or specific treatments
• Booking preferences (advance vs. spontaneous)"
      rows={8}
      className="w-full p-4 border border-gray-300 bg-white bg-opacity-80 text-xs text-gray-900 resize-none leading-relaxed"
    />
  </div>
);

// Results Component with Day-by-Day Itinerary
const ItineraryResults = ({ responses }) => {
  const { guestInfo, energyLevel, wellnessInterests, timingPreference } = responses;
  
  const generateDayByDayItinerary = () => {
    const lengthOfStay = parseInt(guestInfo.lengthOfStay) || 2;
    const interests = wellnessInterests || [];
    const groupType = guestInfo.partyType;
    
    const days = [];

    for (let day = 1; day <= Math.min(lengthOfStay, 4); day++) {
      const daySchedule = generateSingleDay(day, interests, energyLevel, groupType, guestInfo.arrivalTime, guestInfo.departureTime, lengthOfStay, timingPreference);
      days.push({
        day: day,
        title: day === 1 ? 'Arrival Day' : day === lengthOfStay ? 'Departure Day' : 'Day ' + day,
        activities: daySchedule
      });
    }

    return days;
  };

  const generateSingleDay = (dayNumber, interests, energy, groupType) => {
    const activities = [];
    const hasMovement = interests.includes('movement');
    const hasSpa = interests.includes('spa');
    const hasRecovery = interests.includes('recovery');
    const hasOutdoor = interests.includes('outdoor');
    const hasDining = interests.includes('dining');

    if (dayNumber === 1) {
      activities.push({
        time: '3:00 PM',
        activity: 'Check-in & Welcome',
        location: 'Front Desk',
        description: 'Arrive and settle in, receive wellness discount card for Surya Spa'
      });

      if (hasMovement || hasOutdoor) {
        activities.push({
          time: '4:30 PM',
          activity: energy === 'high-activity' ? 'HIIT Class' : energy === 'restorative' ? 'Gentle Yoga' : 'Flow Yoga',
          location: 'Helios Studio',
          description: 'Perfect way to energize after travel'
        });
      }

      if (!hasMovement && !hasOutdoor) {
        activities.push({
          time: '5:00 PM',
          activity: 'Rooftop Pool Welcome Session',
          location: 'Rooftop Pool',
          description: 'Unwind after travel at the only rooftop pool on the Westside - saltwater pool with ocean views and poolside service'
        });
      }

      activities.push({
        time: '6:00 PM',
        activity: 'Sunset Dining',
        location: 'Calabra Rooftop',
        description: 'Mediterranean flavors with panoramic ocean views - try the paprika-dusted hummus with grilled laffa. Pool access included.'
      });
    } else {
      if (hasMovement) {
        const morningClass = energy === 'high-activity' ? 
          (dayNumber % 2 === 0 ? 'Proper Run Club' : 'HIIT Class') :
          energy === 'restorative' ? 
          'Gentle Yoga' : 
          (dayNumber % 2 === 0 ? 'Vinyasa Yoga' : 'Mat Pilates');
        
        activities.push({
          time: timingPreference === 'early-bird' ? '7:00 AM' : '8:00 AM',
          activity: morningClass,
          location: morningClass.includes('Run') ? 'Paseo (meet point)' : 'Helios Studio',
          description: morningClass.includes('Run') ? 'Guided coastal running with Santa Monica views' : 'Start your day with mindful movement',
          bookingLink: morningClass.includes('Run') ? 
            'https://www.eventbrite.com/e/proper-run-club-tickets-1364483429669?aff=oddtdtcreator' : 
            morningClass.includes('HIIT') ? 
            'https://www.eventbrite.com/e/hiit-class-tickets-1345494964659?aff=oddtdtcreator' :
            morningClass.includes('Vinyasa') ?
            'https://www.eventbrite.com/e/vinyasa-yoga-tickets-1345496980689?aff=oddtdtcreator' :
            'https://www.eventbrite.com/e/mat-pilates-tickets-1304652182799?aff=oddtdtcreator',
          bookingText: 'Book on Eventbrite'
        });
      }

      if (hasDining || dayNumber === 2) {
        activities.push({
          time: '9:30 AM',
          activity: hasDining ? 'Ayurvedic Cooking Class' : 'Nourishing Breakfast',
          location: hasDining ? 'Surya Spa Kitchen' : 'Palma',
          description: hasDining ? 'Learn to prepare healing foods with Martha Soffer team' : 'Surya bread with almond butter, banana, honey'
        });
      }

      if (hasMovement && !activities.some(a => a.activity.includes('Class') || a.activity.includes('Club'))) {
        activities.push({
          time: '10:30 AM',
          activity: '24/7 Fitness Center Session',
          location: 'Fitness Center',
          description: 'State-of-the-art strength, cardio, and functional equipment - complimentary for hotel guests'
        });
      }

      if (hasSpa || dayNumber === 1) {
        const spaService = energy === 'high-activity' ? 
          'Abhyanga Four-Handed Massage' : 
          energy === 'restorative' ? 
          'Shirodhara Treatment' : 
          'Signature Ayurvedic Treatment';
        
        activities.push({
          time: '12:00 PM',
          activity: spaService,
          location: 'Surya Spa',
          description: spaService + ' - deeply therapeutic with custom herbalized oils',
          bookingLink: 'tel:310-459-7715',
          bookingText: 'Call Surya Spa'
        });
      }

      if (hasRecovery) {
        const recoveryOption = energy === 'high-activity' ? 
          '90 Minute Recovery Suite (50min Ammortal Chamber) - $345' : 
          '1 Hour Recovery Suite (25min Ammortal Chamber) - $145';
        
        activities.push({
          time: '2:00 PM',
          activity: 'Recovery Suite Session',
          location: 'Recovery Suite',
          description: recoveryOption + ' - Includes cold plunge, sauna, red light therapy, compression therapy, and Ammortal Chamber',
          bookingLink: 'tel:310-620-9990',
          bookingText: 'Call Concierge'
        });
      }

      if (hasDining && dayNumber > 1) {
        activities.push({
          time: '11:00 AM',
          activity: 'Proper Club Lounge Experience',
          location: 'Proper Club Lounge',
          description: 'Full day access ($195) - 2 cold plunge pools, 2 saunas, infrared sauna, outdoor recovery terrace, tea & healthy snacks',
          bookingLink: 'tel:310-620-9990',
          bookingText: 'Call Concierge'
        });
      }

      if (hasDining && dayNumber === 3) {
        activities.push({
          time: '1:00 PM',
          activity: 'Loreto x Calabra Pop-Up Experience',
          location: 'Calabra Rooftop Terrace',
          description: 'Baja seafood pop-up (June 20-Sept 1, Thu-Sun). Try the Aguachile Negro, Bang Bang Rock Shrimp Tostada, and Spicy Pineapple Mezcalita.',
          bookingLink: 'https://www.opentable.com/r/calabra-santa-monica',
          bookingText: 'Reserve Loreto Pop-Up'
        });
      }

      if (hasMovement && energy === 'high-activity' && dayNumber === 2) {
        activities.push({
          time: '10:00 AM',
          activity: 'VO2 Max Testing Session',
          location: 'Fitness Center',
          description: 'Professional cardiovascular fitness assessment ($150) - Previously only available in medical labs, now at Proper',
          bookingLink: 'tel:310-620-9990',
          bookingText: 'Call Concierge'
        });
      }

      if (hasOutdoor || (!hasSpa && !hasRecovery)) {
        const poolActivity = energy === 'restorative' ? 
          'Rooftop Pool Relaxation & Meditation' : 
          energy === 'high-activity' ? 
          'Rooftop Pool Workout & Swim' : 
          'Rooftop Pool & Sunset Views';
          
        activities.push({
          time: '4:00 PM',
          activity: hasOutdoor ? 
            (energy === 'high-activity' ? 'Beach Volleyball' : 'Electric Bike Coastal Ride') : 
            poolActivity,
          location: hasOutdoor ? 
            (energy === 'high-activity' ? 'Santa Monica Beach' : 'Santa Monica Beach Path') : 
            'Rooftop Pool',
          description: hasOutdoor ? 
            (energy === 'high-activity' ? 'Join our beach volleyball clinic with ocean views' : 'Scenic ride along the famous 22-mile coastal trail') :
            'The only rooftop pool on the Westside - saltwater pool with Pacific Ocean views and cabanas'
        });
      }

      if (groupType === 'couple') {
        activities.push({
          time: '6:00 PM',
          activity: 'Couples Sunset Experience',
          location: 'Calabra Rooftop',
          description: 'Private rooftop dining with Pacific sunset views and Mediterranean cuisine'
        });
      } else {
        activities.push({
          time: '6:00 PM',
          activity: 'Sunset Dining',
          location: 'Calabra Rooftop',
          description: 'Mediterranean flavors with panoramic ocean views'
        });
      }
    }

    return activities.slice(0, energy === 'high-activity' ? 6 : energy === 'restorative' ? 4 : 5);
  };

  const itinerary = generateDayByDayItinerary();

  return (
    <div>
      {/* Guest Profile Summary */}
      <div className="bg-gray-900 bg-opacity-5 p-5 mb-6 border border-gray-300">
        <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900 mb-4">
          Your Wellness Profile
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-gray-600 uppercase tracking-wide">Energy Level:</span>
            <p className="text-gray-900 mt-1 capitalize">
              {energyLevel ? energyLevel.replace('-', ' ') : 'Not specified'}
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-600 uppercase tracking-wide">Interests:</span>
            <p className="text-gray-900 mt-1">
              {wellnessInterests && wellnessInterests.length > 0 ? wellnessInterests.join(', ') : 'All areas'}
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-600 uppercase tracking-wide">Group Type:</span>
            <p className="text-gray-900 mt-1 capitalize">
              {guestInfo.partyType || 'Not specified'}
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-600 uppercase tracking-wide">Timing:</span>
            <p className="text-gray-900 mt-1 capitalize">
              {timingPreference ? timingPreference.replace('-', ' ') : 'Flexible'}
            </p>
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      <div>
        <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900 mb-5">
          Your Day-by-Day Wellness Itinerary
        </h3>
        
        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-8 bg-white bg-opacity-50 border border-gray-300">
            {/* Day Header */}
            <div className="bg-gray-900 text-white p-3 text-xs font-bold tracking-widest uppercase text-center">
              {day.title}
            </div>
            
            {/* Day Activities */}
            <div className="p-5">
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className={`flex items-start gap-4 pb-4 mb-4 ${
                  actIndex < day.activities.length - 1 ? 'border-b border-gray-200' : ''
                }`}>
                  <div className="text-xs text-gray-900 font-normal w-20 flex-shrink-0 pt-1">
                    {activity.time}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs text-gray-900 font-bold tracking-wide uppercase mb-1">
                      {activity.activity}
                    </h4>
                    <p className="text-xs text-gray-500 font-normal mb-2">
                      {activity.location}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    {/* Booking Links */}
                    {activity.bookingLink && (
                      <div className="mt-2">
                        <a 
                          href={activity.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border border-gray-900 text-gray-900 px-2 py-1 text-xs font-normal tracking-wide uppercase text-decoration-none transition-all duration-200 hover:bg-gray-900 hover:text-stone-100"
                        >
                          {activity.bookingText || 'Book Now'}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Information */}
        <div className="text-center bg-gray-900 bg-opacity-5 p-6 border border-gray-300">
          <h4 className="text-xs font-bold tracking-wide uppercase text-gray-900 mb-4">
            Ready to Book?
          </h4>
          <div className="text-xs text-gray-500 leading-relaxed mb-5 space-y-2">
            <p>
              <strong>Surya Spa:</strong> (310) 459-7715 | info@suryaspa.com
            </p>
            <p>
              <strong>Fitness Classes:</strong> Book on Eventbrite or front desk
            </p>
            <p>
              <strong>Concierge:</strong> (310) 620-9990
            </p>
          </div>
          <button className="border border-gray-900 text-gray-900 px-4 py-2 text-xs font-normal tracking-wide uppercase cursor-pointer transition-all duration-200 hover:bg-gray-900 hover:text-stone-100">
            Share Itinerary with Concierge
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessSurvey;