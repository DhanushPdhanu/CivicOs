const fs = require('fs');
const path = require('path');

const categories = ['Roads', 'Drainage', 'Water', 'Waste', 'Public Transport', 'Healthcare', 'Education', 'Electricity', 'Other'];
const severities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const statuses = ['Pending', 'Analyzing', 'Reviewed', 'Resolved'];
const districts = ['Demo District A', 'Demo District B', 'Demo District C', 'Demo District D'];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randItem(arr) {
  return arr[randInt(0, arr.length - 1)];
}

const reports = [];
for (let i = 1; i <= 50; i++) {
  const cat = randItem(categories);
  const sev = randItem(['MEDIUM', 'HIGH', 'CRITICAL']);
  reports.push({
    id: `RPT-${1000 + i}`,
    userId: `USR-${randInt(1, 100)}`,
    title: `Issue regarding ${cat.toLowerCase()}`,
    description: `Citizens are facing severe issues with ${cat.toLowerCase()} in this area. It requires immediate attention.`,
    category: cat,
    location: {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      address: `Random Address ${i}`,
      district: randItem(districts),
    },
    images: ['https://via.placeholder.com/400x300?text=Issue+Image'],
    status: randItem(statuses),
    timestamp: new Date(Date.now() - randInt(1000, 1000000000)).toISOString(),
    aiAnalysis: {
      severity: sev,
      urgency: sev,
      confidence: randInt(75, 98),
      summary: `The submitted report indicates recurring issues associated with inadequate ${cat.toLowerCase()} capacity.`,
      detectedCategory: cat,
    }
  });
}

// Add the specific demo report to be exactly matching requirement
reports[0] = {
    id: 'RPT-DEMO-1',
    userId: 'USR-1',
    title: 'Every time it rains, our road gets flooded.',
    description: 'Every time it rains, our road gets flooded.',
    category: 'Drainage',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Main Street near Central Park',
      district: 'Demo District A',
    },
    images: ['https://via.placeholder.com/400x300?text=Flood+Image'],
    status: 'Pending',
    timestamp: new Date().toISOString(),
    aiAnalysis: {
      severity: 'HIGH',
      urgency: 'HIGH',
      confidence: 92,
      summary: 'The submitted report indicates recurring waterlogging associated with inadequate drainage capacity.',
      detectedCategory: 'Drainage',
    }
};

const hotspots = [];
for (let i = 1; i <= 10; i++) {
  const cat = randItem(categories);
  const dist = randItem(districts);
  hotspots.push({
    id: `HOT-${100 + i}`,
    category: cat,
    location: {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      address: `Hotspot Center ${i}`,
      district: dist,
    },
    reportIds: [reports[randInt(0, 49)].id, reports[randInt(0, 49)].id],
    reportCount: randInt(100, 5000),
    trendPercentage: randInt(10, 80),
    severity: randItem(['HIGH', 'CRITICAL']),
    populationAffected: randInt(10000, 100000),
  });
}

// Specific Demo Hotspot
hotspots[0] = {
  id: 'HOT-DEMO-1',
  category: 'Drainage',
  location: {
    lat: 28.6139,
    lng: 77.2090,
    address: 'Main Street near Central Park',
    district: 'Demo District A',
  },
  reportIds: ['RPT-DEMO-1'],
  reportCount: 4821,
  trendPercentage: 38,
  severity: 'HIGH',
  populationAffected: 82000,
};

const predictions = [];
for (let i = 1; i <= 10; i++) {
  predictions.push({
    id: `PRD-${100 + i}`,
    title: `${randItem(categories)} Stress`,
    location: hotspots[i - 1].location,
    riskLevel: hotspots[i - 1].severity,
    predictionWindow: randItem(['1-3 months', '3-6 months', '6-12 months']),
    confidence: randInt(70, 95),
    contributingFactors: [
      'Increasing citizen reports',
      'Population trend',
      'Infrastructure gap',
      'Historical trend'
    ]
  });
}

const projects = [];
for (let i = 1; i <= 10; i++) {
  projects.push({
    id: `PRJ-${100 + i}`,
    title: `${hotspots[i - 1].category} Upgrade Project`,
    description: `Comprehensive upgrade to address ${hotspots[i - 1].category.toLowerCase()} issues in ${hotspots[i - 1].location.district}.`,
    status: randItem(['Planned', 'In Progress', 'Completed']),
    budget: randInt(5, 100),
    location: hotspots[i - 1].location,
  });
}

const recommendations = [];
const evidences = [];

for (let i = 1; i <= 10; i++) {
  const hp = hotspots[i - 1];
  const demand = randInt(70, 99);
  const severityScore = randInt(70, 99);
  const urgency = randInt(70, 99);
  const popImpact = randInt(70, 99);
  const costEff = randInt(70, 99);
  
  const priorityScore = Math.round((demand + severityScore + urgency + popImpact + costEff) / 5);
  
  recommendations.push({
    id: `REC-${100 + i}`,
    title: `${hp.category} Upgrade`,
    location: hp.location,
    priorityScore: priorityScore,
    estimatedCost: randInt(10, 50),
    populationImpact: hp.populationAffected,
    urgency: hp.severity,
    expectedImpact: 'HIGH',
    evidenceId: `EVD-${100 + i}`
  });

  evidences.push({
    id: `EVD-${100 + i}`,
    recommendationId: `REC-${100 + i}`,
    reportCount: hp.reportCount,
    trendPercentage: hp.trendPercentage,
    infrastructureGap: hp.severity,
    populationImpact: hp.populationAffected,
    urgency: hp.severity,
    scoreBreakdown: {
      demand: demand,
      severity: severityScore,
      urgency: urgency,
      populationImpact: popImpact,
      costEfficiency: costEff
    },
    calculationMethodology: 'Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency',
    confidence: randInt(85, 98),
    dataSources: [
      'Citizen Report Aggregation',
      'Historical Geospatial Data',
      'Municipal Infrastructure Index'
    ]
  });
}

// Override demo recommendation for Copilot
recommendations[0] = {
    id: 'REC-DEMO-1',
    title: 'Drainage Upgrade',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Main Street near Central Park',
      district: 'Demo District A',
    },
    priorityScore: 94,
    estimatedCost: 25,
    populationImpact: 82000,
    urgency: 'HIGH',
    expectedImpact: 'CRITICAL',
    evidenceId: 'EVD-DEMO-1'
};

evidences[0] = {
    id: 'EVD-DEMO-1',
    recommendationId: 'REC-DEMO-1',
    reportCount: 4821,
    trendPercentage: 38,
    infrastructureGap: 'HIGH',
    populationImpact: 82000,
    urgency: 'HIGH',
    scoreBreakdown: {
      demand: 92,
      severity: 96,
      urgency: 95,
      populationImpact: 90,
      costEfficiency: 91
    },
    calculationMethodology: 'Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency',
    confidence: 94,
    dataSources: [
      'Citizen Report Aggregation',
      'Historical Geospatial Data',
      'Municipal Infrastructure Index'
    ]
};

const output = `import { CitizenReport, Hotspot, Prediction, Project, Recommendation, Evidence, User } from '../types';

export const mockReports: CitizenReport[] = ${JSON.stringify(reports, null, 2)};
export const mockHotspots: Hotspot[] = ${JSON.stringify(hotspots, null, 2)};
export const mockPredictions: Prediction[] = ${JSON.stringify(predictions, null, 2)};
export const mockProjects: Project[] = ${JSON.stringify(projects, null, 2)};
export const mockRecommendations: Recommendation[] = ${JSON.stringify(recommendations, null, 2)};
export const mockEvidences: Evidence[] = ${JSON.stringify(evidences, null, 2)};

export const mockUser: User = {
  id: 'USR-ME',
  name: 'Demo Official',
  role: 'Government'
};
`;

const dir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'mockData.ts'), output);
console.log('Mock data generated successfully!');
