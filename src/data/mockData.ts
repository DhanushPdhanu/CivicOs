import { CitizenReport, Hotspot, Prediction, Project, Recommendation, Evidence, User } from '../types';

export const mockReports: CitizenReport[] = [
  {
    "id": "RPT-DEMO-1",
    "userId": "USR-1",
    "title": "Every time it rains, our road gets flooded.",
    "description": "Every time it rains, our road gets flooded.",
    "category": "Drainage",
    "location": {
      "lat": 28.6139,
      "lng": 77.209,
      "address": "Main Street near Central Park",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Flood+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-18T07:11:31.351Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 92,
      "summary": "The submitted report indicates recurring waterlogging associated with inadequate drainage capacity.",
      "detectedCategory": "Drainage"
    }
  },
  {
    "id": "RPT-1002",
    "userId": "USR-51",
    "title": "Issue regarding other",
    "description": "Citizens are facing severe issues with other in this area. It requires immediate attention.",
    "category": "Other",
    "location": {
      "lat": 28.634542214445233,
      "lng": 77.17570171163955,
      "address": "Random Address 2",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-12T22:31:24.126Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 83,
      "summary": "The submitted report indicates recurring issues associated with inadequate other capacity.",
      "detectedCategory": "Other"
    }
  },
  {
    "id": "RPT-1003",
    "userId": "USR-68",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.568570605673035,
      "lng": 77.19628735415729,
      "address": "Random Address 3",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-12T23:23:17.967Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 88,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1004",
    "userId": "USR-12",
    "title": "Issue regarding water",
    "description": "Citizens are facing severe issues with water in this area. It requires immediate attention.",
    "category": "Water",
    "location": {
      "lat": 28.63782398399745,
      "lng": 77.1730840830422,
      "address": "Random Address 4",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-07T10:07:31.402Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 80,
      "summary": "The submitted report indicates recurring issues associated with inadequate water capacity.",
      "detectedCategory": "Water"
    }
  },
  {
    "id": "RPT-1005",
    "userId": "USR-10",
    "title": "Issue regarding water",
    "description": "Citizens are facing severe issues with water in this area. It requires immediate attention.",
    "category": "Water",
    "location": {
      "lat": 28.633575132506774,
      "lng": 77.24751240014417,
      "address": "Random Address 5",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-13T19:23:50.727Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 93,
      "summary": "The submitted report indicates recurring issues associated with inadequate water capacity.",
      "detectedCategory": "Water"
    }
  },
  {
    "id": "RPT-1006",
    "userId": "USR-2",
    "title": "Issue regarding public transport",
    "description": "Citizens are facing severe issues with public transport in this area. It requires immediate attention.",
    "category": "Public Transport",
    "location": {
      "lat": 28.641043713502206,
      "lng": 77.21645158584306,
      "address": "Random Address 6",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-16T22:14:59.591Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 81,
      "summary": "The submitted report indicates recurring issues associated with inadequate public transport capacity.",
      "detectedCategory": "Public Transport"
    }
  },
  {
    "id": "RPT-1007",
    "userId": "USR-14",
    "title": "Issue regarding drainage",
    "description": "Citizens are facing severe issues with drainage in this area. It requires immediate attention.",
    "category": "Drainage",
    "location": {
      "lat": 28.639634612260824,
      "lng": 77.239793835836,
      "address": "Random Address 7",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-10T05:21:01.680Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 97,
      "summary": "The submitted report indicates recurring issues associated with inadequate drainage capacity.",
      "detectedCategory": "Drainage"
    }
  },
  {
    "id": "RPT-1008",
    "userId": "USR-27",
    "title": "Issue regarding water",
    "description": "Citizens are facing severe issues with water in this area. It requires immediate attention.",
    "category": "Water",
    "location": {
      "lat": 28.63027612290495,
      "lng": 77.16219087370533,
      "address": "Random Address 8",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-12T06:58:41.081Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 97,
      "summary": "The submitted report indicates recurring issues associated with inadequate water capacity.",
      "detectedCategory": "Water"
    }
  },
  {
    "id": "RPT-1009",
    "userId": "USR-68",
    "title": "Issue regarding waste",
    "description": "Citizens are facing severe issues with waste in this area. It requires immediate attention.",
    "category": "Waste",
    "location": {
      "lat": 28.59411855864032,
      "lng": 77.23503979276053,
      "address": "Random Address 9",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-15T05:31:12.351Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 95,
      "summary": "The submitted report indicates recurring issues associated with inadequate waste capacity.",
      "detectedCategory": "Waste"
    }
  },
  {
    "id": "RPT-1010",
    "userId": "USR-39",
    "title": "Issue regarding roads",
    "description": "Citizens are facing severe issues with roads in this area. It requires immediate attention.",
    "category": "Roads",
    "location": {
      "lat": 28.64629537678459,
      "lng": 77.21839620927132,
      "address": "Random Address 10",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-13T06:29:08.378Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 86,
      "summary": "The submitted report indicates recurring issues associated with inadequate roads capacity.",
      "detectedCategory": "Roads"
    }
  },
  {
    "id": "RPT-1011",
    "userId": "USR-97",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.61721948943432,
      "lng": 77.25764576464006,
      "address": "Random Address 11",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-10T22:00:24.047Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 93,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1012",
    "userId": "USR-30",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.60632064237585,
      "lng": 77.18102721982194,
      "address": "Random Address 12",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-09T16:47:17.436Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 96,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1013",
    "userId": "USR-52",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.623622958819222,
      "lng": 77.20812012077101,
      "address": "Random Address 13",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-07T19:52:05.056Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 85,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1014",
    "userId": "USR-66",
    "title": "Issue regarding healthcare",
    "description": "Citizens are facing severe issues with healthcare in this area. It requires immediate attention.",
    "category": "Healthcare",
    "location": {
      "lat": 28.60117944658155,
      "lng": 77.2361325974717,
      "address": "Random Address 14",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-10T18:00:03.921Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 92,
      "summary": "The submitted report indicates recurring issues associated with inadequate healthcare capacity.",
      "detectedCategory": "Healthcare"
    }
  },
  {
    "id": "RPT-1015",
    "userId": "USR-75",
    "title": "Issue regarding public transport",
    "description": "Citizens are facing severe issues with public transport in this area. It requires immediate attention.",
    "category": "Public Transport",
    "location": {
      "lat": 28.663173170042004,
      "lng": 77.24497615492048,
      "address": "Random Address 15",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-16T23:48:46.079Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 98,
      "summary": "The submitted report indicates recurring issues associated with inadequate public transport capacity.",
      "detectedCategory": "Public Transport"
    }
  },
  {
    "id": "RPT-1016",
    "userId": "USR-14",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.583553678067048,
      "lng": 77.21929564791164,
      "address": "Random Address 16",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-18T07:01:49.675Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 91,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1017",
    "userId": "USR-91",
    "title": "Issue regarding water",
    "description": "Citizens are facing severe issues with water in this area. It requires immediate attention.",
    "category": "Water",
    "location": {
      "lat": 28.58390198610102,
      "lng": 77.19878269921463,
      "address": "Random Address 17",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-06T22:30:28.473Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 76,
      "summary": "The submitted report indicates recurring issues associated with inadequate water capacity.",
      "detectedCategory": "Water"
    }
  },
  {
    "id": "RPT-1018",
    "userId": "USR-98",
    "title": "Issue regarding roads",
    "description": "Citizens are facing severe issues with roads in this area. It requires immediate attention.",
    "category": "Roads",
    "location": {
      "lat": 28.59102280401012,
      "lng": 77.1949724031488,
      "address": "Random Address 18",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-09T13:30:59.903Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 96,
      "summary": "The submitted report indicates recurring issues associated with inadequate roads capacity.",
      "detectedCategory": "Roads"
    }
  },
  {
    "id": "RPT-1019",
    "userId": "USR-43",
    "title": "Issue regarding waste",
    "description": "Citizens are facing severe issues with waste in this area. It requires immediate attention.",
    "category": "Waste",
    "location": {
      "lat": 28.63732808609835,
      "lng": 77.25220225980458,
      "address": "Random Address 19",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-15T23:30:18.279Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 85,
      "summary": "The submitted report indicates recurring issues associated with inadequate waste capacity.",
      "detectedCategory": "Waste"
    }
  },
  {
    "id": "RPT-1020",
    "userId": "USR-57",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.63688006285699,
      "lng": 77.1773354260697,
      "address": "Random Address 20",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-14T02:57:08.289Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 94,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1021",
    "userId": "USR-73",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.611822752872545,
      "lng": 77.19818454235214,
      "address": "Random Address 21",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-15T21:37:50.209Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 88,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1022",
    "userId": "USR-58",
    "title": "Issue regarding drainage",
    "description": "Citizens are facing severe issues with drainage in this area. It requires immediate attention.",
    "category": "Drainage",
    "location": {
      "lat": 28.641443796488375,
      "lng": 77.25732204406785,
      "address": "Random Address 22",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-09T07:16:16.568Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 94,
      "summary": "The submitted report indicates recurring issues associated with inadequate drainage capacity.",
      "detectedCategory": "Drainage"
    }
  },
  {
    "id": "RPT-1023",
    "userId": "USR-39",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.617636315044383,
      "lng": 77.19090077216458,
      "address": "Random Address 23",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-09T03:47:05.524Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 93,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1024",
    "userId": "USR-41",
    "title": "Issue regarding healthcare",
    "description": "Citizens are facing severe issues with healthcare in this area. It requires immediate attention.",
    "category": "Healthcare",
    "location": {
      "lat": 28.584269255991604,
      "lng": 77.23804681679775,
      "address": "Random Address 24",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-06T21:05:49.069Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 76,
      "summary": "The submitted report indicates recurring issues associated with inadequate healthcare capacity.",
      "detectedCategory": "Healthcare"
    }
  },
  {
    "id": "RPT-1025",
    "userId": "USR-92",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.65273239035152,
      "lng": 77.1880967136788,
      "address": "Random Address 25",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-08T00:58:21.342Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 78,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1026",
    "userId": "USR-6",
    "title": "Issue regarding drainage",
    "description": "Citizens are facing severe issues with drainage in this area. It requires immediate attention.",
    "category": "Drainage",
    "location": {
      "lat": 28.609679727135084,
      "lng": 77.19134031390283,
      "address": "Random Address 26",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-07T12:51:15.405Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 78,
      "summary": "The submitted report indicates recurring issues associated with inadequate drainage capacity.",
      "detectedCategory": "Drainage"
    }
  },
  {
    "id": "RPT-1027",
    "userId": "USR-58",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.64213098377076,
      "lng": 77.21777593517699,
      "address": "Random Address 27",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-16T19:25:46.940Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 84,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1028",
    "userId": "USR-97",
    "title": "Issue regarding healthcare",
    "description": "Citizens are facing severe issues with healthcare in this area. It requires immediate attention.",
    "category": "Healthcare",
    "location": {
      "lat": 28.603931486044104,
      "lng": 77.23049974300531,
      "address": "Random Address 28",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-18T02:30:49.851Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 77,
      "summary": "The submitted report indicates recurring issues associated with inadequate healthcare capacity.",
      "detectedCategory": "Healthcare"
    }
  },
  {
    "id": "RPT-1029",
    "userId": "USR-84",
    "title": "Issue regarding waste",
    "description": "Citizens are facing severe issues with waste in this area. It requires immediate attention.",
    "category": "Waste",
    "location": {
      "lat": 28.597300700242013,
      "lng": 77.23405136549978,
      "address": "Random Address 29",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-12T21:02:32.051Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 82,
      "summary": "The submitted report indicates recurring issues associated with inadequate waste capacity.",
      "detectedCategory": "Waste"
    }
  },
  {
    "id": "RPT-1030",
    "userId": "USR-4",
    "title": "Issue regarding waste",
    "description": "Citizens are facing severe issues with waste in this area. It requires immediate attention.",
    "category": "Waste",
    "location": {
      "lat": 28.586568219899227,
      "lng": 77.15905069002629,
      "address": "Random Address 30",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-16T01:43:55.221Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 86,
      "summary": "The submitted report indicates recurring issues associated with inadequate waste capacity.",
      "detectedCategory": "Waste"
    }
  },
  {
    "id": "RPT-1031",
    "userId": "USR-88",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.64341037456898,
      "lng": 77.21611755189355,
      "address": "Random Address 31",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-16T07:48:15.187Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 80,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1032",
    "userId": "USR-20",
    "title": "Issue regarding drainage",
    "description": "Citizens are facing severe issues with drainage in this area. It requires immediate attention.",
    "category": "Drainage",
    "location": {
      "lat": 28.56864375293576,
      "lng": 77.25658149107029,
      "address": "Random Address 32",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-16T01:51:09.755Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 92,
      "summary": "The submitted report indicates recurring issues associated with inadequate drainage capacity.",
      "detectedCategory": "Drainage"
    }
  },
  {
    "id": "RPT-1033",
    "userId": "USR-17",
    "title": "Issue regarding roads",
    "description": "Citizens are facing severe issues with roads in this area. It requires immediate attention.",
    "category": "Roads",
    "location": {
      "lat": 28.61720671702253,
      "lng": 77.25813837148723,
      "address": "Random Address 33",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-09T10:35:44.196Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 90,
      "summary": "The submitted report indicates recurring issues associated with inadequate roads capacity.",
      "detectedCategory": "Roads"
    }
  },
  {
    "id": "RPT-1034",
    "userId": "USR-26",
    "title": "Issue regarding water",
    "description": "Citizens are facing severe issues with water in this area. It requires immediate attention.",
    "category": "Water",
    "location": {
      "lat": 28.616519899550184,
      "lng": 77.24412987034515,
      "address": "Random Address 34",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-06T21:17:24.197Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 95,
      "summary": "The submitted report indicates recurring issues associated with inadequate water capacity.",
      "detectedCategory": "Water"
    }
  },
  {
    "id": "RPT-1035",
    "userId": "USR-30",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.57006560685689,
      "lng": 77.18924137089198,
      "address": "Random Address 35",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-17T07:11:28.803Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 75,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1036",
    "userId": "USR-57",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.587593883751858,
      "lng": 77.24944666640208,
      "address": "Random Address 36",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-14T03:38:03.931Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 75,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1037",
    "userId": "USR-32",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.646588738533318,
      "lng": 77.2490703010507,
      "address": "Random Address 37",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-14T03:10:25.638Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 75,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1038",
    "userId": "USR-56",
    "title": "Issue regarding other",
    "description": "Citizens are facing severe issues with other in this area. It requires immediate attention.",
    "category": "Other",
    "location": {
      "lat": 28.651718671838765,
      "lng": 77.24199972688267,
      "address": "Random Address 38",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-15T06:55:21.289Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 95,
      "summary": "The submitted report indicates recurring issues associated with inadequate other capacity.",
      "detectedCategory": "Other"
    }
  },
  {
    "id": "RPT-1039",
    "userId": "USR-99",
    "title": "Issue regarding roads",
    "description": "Citizens are facing severe issues with roads in this area. It requires immediate attention.",
    "category": "Roads",
    "location": {
      "lat": 28.573146936351844,
      "lng": 77.20371537591376,
      "address": "Random Address 39",
      "district": "Demo District A"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-15T05:58:52.539Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 93,
      "summary": "The submitted report indicates recurring issues associated with inadequate roads capacity.",
      "detectedCategory": "Roads"
    }
  },
  {
    "id": "RPT-1040",
    "userId": "USR-50",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.595023562821964,
      "lng": 77.24007111453263,
      "address": "Random Address 40",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-14T16:50:57.020Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 97,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1041",
    "userId": "USR-14",
    "title": "Issue regarding public transport",
    "description": "Citizens are facing severe issues with public transport in this area. It requires immediate attention.",
    "category": "Public Transport",
    "location": {
      "lat": 28.61896287282228,
      "lng": 77.17385959929402,
      "address": "Random Address 41",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-16T21:18:10.355Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 82,
      "summary": "The submitted report indicates recurring issues associated with inadequate public transport capacity.",
      "detectedCategory": "Public Transport"
    }
  },
  {
    "id": "RPT-1042",
    "userId": "USR-77",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.611305647539126,
      "lng": 77.23843329172503,
      "address": "Random Address 42",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-09T22:58:19.935Z",
    "aiAnalysis": {
      "severity": "MEDIUM",
      "urgency": "MEDIUM",
      "confidence": 79,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1043",
    "userId": "USR-15",
    "title": "Issue regarding public transport",
    "description": "Citizens are facing severe issues with public transport in this area. It requires immediate attention.",
    "category": "Public Transport",
    "location": {
      "lat": 28.58038228005084,
      "lng": 77.23020710287152,
      "address": "Random Address 43",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-13T17:05:51.403Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 87,
      "summary": "The submitted report indicates recurring issues associated with inadequate public transport capacity.",
      "detectedCategory": "Public Transport"
    }
  },
  {
    "id": "RPT-1044",
    "userId": "USR-59",
    "title": "Issue regarding healthcare",
    "description": "Citizens are facing severe issues with healthcare in this area. It requires immediate attention.",
    "category": "Healthcare",
    "location": {
      "lat": 28.634606281263345,
      "lng": 77.179648516173,
      "address": "Random Address 44",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-14T13:25:55.448Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 95,
      "summary": "The submitted report indicates recurring issues associated with inadequate healthcare capacity.",
      "detectedCategory": "Healthcare"
    }
  },
  {
    "id": "RPT-1045",
    "userId": "USR-27",
    "title": "Issue regarding healthcare",
    "description": "Citizens are facing severe issues with healthcare in this area. It requires immediate attention.",
    "category": "Healthcare",
    "location": {
      "lat": 28.62082631339945,
      "lng": 77.2043917342672,
      "address": "Random Address 45",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Analyzing",
    "timestamp": "2026-09-15T12:23:03.948Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 77,
      "summary": "The submitted report indicates recurring issues associated with inadequate healthcare capacity.",
      "detectedCategory": "Healthcare"
    }
  },
  {
    "id": "RPT-1046",
    "userId": "USR-98",
    "title": "Issue regarding healthcare",
    "description": "Citizens are facing severe issues with healthcare in this area. It requires immediate attention.",
    "category": "Healthcare",
    "location": {
      "lat": 28.587089576967966,
      "lng": 77.18660867510054,
      "address": "Random Address 46",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-12T22:46:08.768Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 76,
      "summary": "The submitted report indicates recurring issues associated with inadequate healthcare capacity.",
      "detectedCategory": "Healthcare"
    }
  },
  {
    "id": "RPT-1047",
    "userId": "USR-95",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.586996387236518,
      "lng": 77.2312338730208,
      "address": "Random Address 47",
      "district": "Demo District C"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-09T13:18:44.079Z",
    "aiAnalysis": {
      "severity": "HIGH",
      "urgency": "HIGH",
      "confidence": 86,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  },
  {
    "id": "RPT-1048",
    "userId": "USR-40",
    "title": "Issue regarding drainage",
    "description": "Citizens are facing severe issues with drainage in this area. It requires immediate attention.",
    "category": "Drainage",
    "location": {
      "lat": 28.585024228738906,
      "lng": 77.2012845035144,
      "address": "Random Address 48",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Pending",
    "timestamp": "2026-09-12T21:24:41.156Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 90,
      "summary": "The submitted report indicates recurring issues associated with inadequate drainage capacity.",
      "detectedCategory": "Drainage"
    }
  },
  {
    "id": "RPT-1049",
    "userId": "USR-91",
    "title": "Issue regarding electricity",
    "description": "Citizens are facing severe issues with electricity in this area. It requires immediate attention.",
    "category": "Electricity",
    "location": {
      "lat": 28.598281191117046,
      "lng": 77.18126319943607,
      "address": "Random Address 49",
      "district": "Demo District B"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Reviewed",
    "timestamp": "2026-09-12T08:40:44.900Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 75,
      "summary": "The submitted report indicates recurring issues associated with inadequate electricity capacity.",
      "detectedCategory": "Electricity"
    }
  },
  {
    "id": "RPT-1050",
    "userId": "USR-4",
    "title": "Issue regarding education",
    "description": "Citizens are facing severe issues with education in this area. It requires immediate attention.",
    "category": "Education",
    "location": {
      "lat": 28.617297313436822,
      "lng": 77.17043878241837,
      "address": "Random Address 50",
      "district": "Demo District D"
    },
    "images": [
      "https://via.placeholder.com/400x300?text=Issue+Image"
    ],
    "status": "Resolved",
    "timestamp": "2026-09-07T05:59:34.367Z",
    "aiAnalysis": {
      "severity": "CRITICAL",
      "urgency": "CRITICAL",
      "confidence": 82,
      "summary": "The submitted report indicates recurring issues associated with inadequate education capacity.",
      "detectedCategory": "Education"
    }
  }
];
export const mockHotspots: Hotspot[] = [
  {
    "id": "HOT-DEMO-1",
    "category": "Drainage",
    "location": {
      "lat": 28.6139,
      "lng": 77.209,
      "address": "Main Street near Central Park",
      "district": "Demo District A"
    },
    "reportIds": [
      "RPT-DEMO-1"
    ],
    "reportCount": 4821,
    "trendPercentage": 38,
    "severity": "HIGH",
    "populationAffected": 82000
  },
  {
    "id": "HOT-102",
    "category": "Waste",
    "location": {
      "lat": 28.62472882293011,
      "lng": 77.23209231032767,
      "address": "Hotspot Center 2",
      "district": "Demo District B"
    },
    "reportIds": [
      "RPT-1008",
      "RPT-1047"
    ],
    "reportCount": 4691,
    "trendPercentage": 44,
    "severity": "CRITICAL",
    "populationAffected": 42020
  },
  {
    "id": "HOT-103",
    "category": "Waste",
    "location": {
      "lat": 28.589073545415186,
      "lng": 77.21549567773675,
      "address": "Hotspot Center 3",
      "district": "Demo District A"
    },
    "reportIds": [
      "RPT-1045",
      "RPT-1042"
    ],
    "reportCount": 2597,
    "trendPercentage": 80,
    "severity": "HIGH",
    "populationAffected": 51085
  },
  {
    "id": "HOT-104",
    "category": "Electricity",
    "location": {
      "lat": 28.596226490822186,
      "lng": 77.1605284452435,
      "address": "Hotspot Center 4",
      "district": "Demo District A"
    },
    "reportIds": [
      "RPT-1022",
      "RPT-1014"
    ],
    "reportCount": 3026,
    "trendPercentage": 27,
    "severity": "HIGH",
    "populationAffected": 15593
  },
  {
    "id": "HOT-105",
    "category": "Drainage",
    "location": {
      "lat": 28.62911648855268,
      "lng": 77.25803526740714,
      "address": "Hotspot Center 5",
      "district": "Demo District A"
    },
    "reportIds": [
      "RPT-1025",
      "RPT-1050"
    ],
    "reportCount": 2108,
    "trendPercentage": 66,
    "severity": "HIGH",
    "populationAffected": 76396
  },
  {
    "id": "HOT-106",
    "category": "Drainage",
    "location": {
      "lat": 28.573058823373117,
      "lng": 77.18827996672822,
      "address": "Hotspot Center 6",
      "district": "Demo District D"
    },
    "reportIds": [
      "RPT-1050",
      "RPT-1046"
    ],
    "reportCount": 2612,
    "trendPercentage": 28,
    "severity": "HIGH",
    "populationAffected": 80528
  },
  {
    "id": "HOT-107",
    "category": "Healthcare",
    "location": {
      "lat": 28.609506994606924,
      "lng": 77.21642175956855,
      "address": "Hotspot Center 7",
      "district": "Demo District C"
    },
    "reportIds": [
      "RPT-1017",
      "RPT-1003"
    ],
    "reportCount": 2494,
    "trendPercentage": 14,
    "severity": "CRITICAL",
    "populationAffected": 17315
  },
  {
    "id": "HOT-108",
    "category": "Water",
    "location": {
      "lat": 28.632289716172107,
      "lng": 77.2404209682155,
      "address": "Hotspot Center 8",
      "district": "Demo District C"
    },
    "reportIds": [
      "RPT-1046",
      "RPT-1044"
    ],
    "reportCount": 4130,
    "trendPercentage": 37,
    "severity": "CRITICAL",
    "populationAffected": 41573
  },
  {
    "id": "HOT-109",
    "category": "Other",
    "location": {
      "lat": 28.643241235289853,
      "lng": 77.22849245258617,
      "address": "Hotspot Center 9",
      "district": "Demo District A"
    },
    "reportIds": [
      "RPT-1004",
      "RPT-1013"
    ],
    "reportCount": 3653,
    "trendPercentage": 62,
    "severity": "HIGH",
    "populationAffected": 21026
  },
  {
    "id": "HOT-110",
    "category": "Drainage",
    "location": {
      "lat": 28.571000668782,
      "lng": 77.24534088856525,
      "address": "Hotspot Center 10",
      "district": "Demo District B"
    },
    "reportIds": [
      "RPT-1048",
      "RPT-1010"
    ],
    "reportCount": 4370,
    "trendPercentage": 42,
    "severity": "HIGH",
    "populationAffected": 94507
  }
];
export const mockPredictions: Prediction[] = [
  {
    "id": "PRD-101",
    "title": "Healthcare Stress",
    "location": {
      "lat": 28.6139,
      "lng": 77.209,
      "address": "Main Street near Central Park",
      "district": "Demo District A"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "1-3 months",
    "confidence": 82,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-102",
    "title": "Waste Stress",
    "location": {
      "lat": 28.62472882293011,
      "lng": 77.23209231032767,
      "address": "Hotspot Center 2",
      "district": "Demo District B"
    },
    "riskLevel": "CRITICAL",
    "predictionWindow": "6-12 months",
    "confidence": 91,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-103",
    "title": "Waste Stress",
    "location": {
      "lat": 28.589073545415186,
      "lng": 77.21549567773675,
      "address": "Hotspot Center 3",
      "district": "Demo District A"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "1-3 months",
    "confidence": 71,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-104",
    "title": "Water Stress",
    "location": {
      "lat": 28.596226490822186,
      "lng": 77.1605284452435,
      "address": "Hotspot Center 4",
      "district": "Demo District A"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "1-3 months",
    "confidence": 86,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-105",
    "title": "Roads Stress",
    "location": {
      "lat": 28.62911648855268,
      "lng": 77.25803526740714,
      "address": "Hotspot Center 5",
      "district": "Demo District A"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "1-3 months",
    "confidence": 80,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-106",
    "title": "Public Transport Stress",
    "location": {
      "lat": 28.573058823373117,
      "lng": 77.18827996672822,
      "address": "Hotspot Center 6",
      "district": "Demo District D"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "6-12 months",
    "confidence": 90,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-107",
    "title": "Drainage Stress",
    "location": {
      "lat": 28.609506994606924,
      "lng": 77.21642175956855,
      "address": "Hotspot Center 7",
      "district": "Demo District C"
    },
    "riskLevel": "CRITICAL",
    "predictionWindow": "6-12 months",
    "confidence": 90,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-108",
    "title": "Other Stress",
    "location": {
      "lat": 28.632289716172107,
      "lng": 77.2404209682155,
      "address": "Hotspot Center 8",
      "district": "Demo District C"
    },
    "riskLevel": "CRITICAL",
    "predictionWindow": "3-6 months",
    "confidence": 77,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-109",
    "title": "Electricity Stress",
    "location": {
      "lat": 28.643241235289853,
      "lng": 77.22849245258617,
      "address": "Hotspot Center 9",
      "district": "Demo District A"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "1-3 months",
    "confidence": 90,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  },
  {
    "id": "PRD-110",
    "title": "Healthcare Stress",
    "location": {
      "lat": 28.571000668782,
      "lng": 77.24534088856525,
      "address": "Hotspot Center 10",
      "district": "Demo District B"
    },
    "riskLevel": "HIGH",
    "predictionWindow": "3-6 months",
    "confidence": 93,
    "contributingFactors": [
      "Increasing citizen reports",
      "Population trend",
      "Infrastructure gap",
      "Historical trend"
    ]
  }
];
export const mockProjects: Project[] = [
  {
    "id": "PRJ-101",
    "title": "Drainage Upgrade Project",
    "description": "Comprehensive upgrade to address drainage issues in Demo District A.",
    "status": "In Progress",
    "budget": 53,
    "location": {
      "lat": 28.6139,
      "lng": 77.209,
      "address": "Main Street near Central Park",
      "district": "Demo District A"
    }
  },
  {
    "id": "PRJ-102",
    "title": "Waste Upgrade Project",
    "description": "Comprehensive upgrade to address waste issues in Demo District B.",
    "status": "In Progress",
    "budget": 47,
    "location": {
      "lat": 28.62472882293011,
      "lng": 77.23209231032767,
      "address": "Hotspot Center 2",
      "district": "Demo District B"
    }
  },
  {
    "id": "PRJ-103",
    "title": "Waste Upgrade Project",
    "description": "Comprehensive upgrade to address waste issues in Demo District A.",
    "status": "Planned",
    "budget": 62,
    "location": {
      "lat": 28.589073545415186,
      "lng": 77.21549567773675,
      "address": "Hotspot Center 3",
      "district": "Demo District A"
    }
  },
  {
    "id": "PRJ-104",
    "title": "Electricity Upgrade Project",
    "description": "Comprehensive upgrade to address electricity issues in Demo District A.",
    "status": "Planned",
    "budget": 10,
    "location": {
      "lat": 28.596226490822186,
      "lng": 77.1605284452435,
      "address": "Hotspot Center 4",
      "district": "Demo District A"
    }
  },
  {
    "id": "PRJ-105",
    "title": "Drainage Upgrade Project",
    "description": "Comprehensive upgrade to address drainage issues in Demo District A.",
    "status": "Planned",
    "budget": 83,
    "location": {
      "lat": 28.62911648855268,
      "lng": 77.25803526740714,
      "address": "Hotspot Center 5",
      "district": "Demo District A"
    }
  },
  {
    "id": "PRJ-106",
    "title": "Drainage Upgrade Project",
    "description": "Comprehensive upgrade to address drainage issues in Demo District D.",
    "status": "In Progress",
    "budget": 35,
    "location": {
      "lat": 28.573058823373117,
      "lng": 77.18827996672822,
      "address": "Hotspot Center 6",
      "district": "Demo District D"
    }
  },
  {
    "id": "PRJ-107",
    "title": "Healthcare Upgrade Project",
    "description": "Comprehensive upgrade to address healthcare issues in Demo District C.",
    "status": "Planned",
    "budget": 57,
    "location": {
      "lat": 28.609506994606924,
      "lng": 77.21642175956855,
      "address": "Hotspot Center 7",
      "district": "Demo District C"
    }
  },
  {
    "id": "PRJ-108",
    "title": "Water Upgrade Project",
    "description": "Comprehensive upgrade to address water issues in Demo District C.",
    "status": "Completed",
    "budget": 9,
    "location": {
      "lat": 28.632289716172107,
      "lng": 77.2404209682155,
      "address": "Hotspot Center 8",
      "district": "Demo District C"
    }
  },
  {
    "id": "PRJ-109",
    "title": "Other Upgrade Project",
    "description": "Comprehensive upgrade to address other issues in Demo District A.",
    "status": "Completed",
    "budget": 75,
    "location": {
      "lat": 28.643241235289853,
      "lng": 77.22849245258617,
      "address": "Hotspot Center 9",
      "district": "Demo District A"
    }
  },
  {
    "id": "PRJ-110",
    "title": "Drainage Upgrade Project",
    "description": "Comprehensive upgrade to address drainage issues in Demo District B.",
    "status": "Planned",
    "budget": 82,
    "location": {
      "lat": 28.571000668782,
      "lng": 77.24534088856525,
      "address": "Hotspot Center 10",
      "district": "Demo District B"
    }
  }
];
export const mockRecommendations: Recommendation[] = [
  {
    "id": "REC-DEMO-1",
    "title": "Drainage Upgrade",
    "location": {
      "lat": 28.6139,
      "lng": 77.209,
      "address": "Main Street near Central Park",
      "district": "Demo District A"
    },
    "priorityScore": 94,
    "estimatedCost": 25,
    "populationImpact": 82000,
    "urgency": "HIGH",
    "expectedImpact": "CRITICAL",
    "evidenceId": "EVD-DEMO-1"
  },
  {
    "id": "REC-102",
    "title": "Waste Upgrade",
    "location": {
      "lat": 28.62472882293011,
      "lng": 77.23209231032767,
      "address": "Hotspot Center 2",
      "district": "Demo District B"
    },
    "priorityScore": 83,
    "estimatedCost": 14,
    "populationImpact": 42020,
    "urgency": "CRITICAL",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-102"
  },
  {
    "id": "REC-103",
    "title": "Waste Upgrade",
    "location": {
      "lat": 28.589073545415186,
      "lng": 77.21549567773675,
      "address": "Hotspot Center 3",
      "district": "Demo District A"
    },
    "priorityScore": 81,
    "estimatedCost": 41,
    "populationImpact": 51085,
    "urgency": "HIGH",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-103"
  },
  {
    "id": "REC-104",
    "title": "Electricity Upgrade",
    "location": {
      "lat": 28.596226490822186,
      "lng": 77.1605284452435,
      "address": "Hotspot Center 4",
      "district": "Demo District A"
    },
    "priorityScore": 86,
    "estimatedCost": 25,
    "populationImpact": 15593,
    "urgency": "HIGH",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-104"
  },
  {
    "id": "REC-105",
    "title": "Drainage Upgrade",
    "location": {
      "lat": 28.62911648855268,
      "lng": 77.25803526740714,
      "address": "Hotspot Center 5",
      "district": "Demo District A"
    },
    "priorityScore": 86,
    "estimatedCost": 41,
    "populationImpact": 76396,
    "urgency": "HIGH",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-105"
  },
  {
    "id": "REC-106",
    "title": "Drainage Upgrade",
    "location": {
      "lat": 28.573058823373117,
      "lng": 77.18827996672822,
      "address": "Hotspot Center 6",
      "district": "Demo District D"
    },
    "priorityScore": 82,
    "estimatedCost": 19,
    "populationImpact": 80528,
    "urgency": "HIGH",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-106"
  },
  {
    "id": "REC-107",
    "title": "Healthcare Upgrade",
    "location": {
      "lat": 28.609506994606924,
      "lng": 77.21642175956855,
      "address": "Hotspot Center 7",
      "district": "Demo District C"
    },
    "priorityScore": 80,
    "estimatedCost": 19,
    "populationImpact": 17315,
    "urgency": "CRITICAL",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-107"
  },
  {
    "id": "REC-108",
    "title": "Water Upgrade",
    "location": {
      "lat": 28.632289716172107,
      "lng": 77.2404209682155,
      "address": "Hotspot Center 8",
      "district": "Demo District C"
    },
    "priorityScore": 84,
    "estimatedCost": 24,
    "populationImpact": 41573,
    "urgency": "CRITICAL",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-108"
  },
  {
    "id": "REC-109",
    "title": "Other Upgrade",
    "location": {
      "lat": 28.643241235289853,
      "lng": 77.22849245258617,
      "address": "Hotspot Center 9",
      "district": "Demo District A"
    },
    "priorityScore": 80,
    "estimatedCost": 35,
    "populationImpact": 21026,
    "urgency": "HIGH",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-109"
  },
  {
    "id": "REC-110",
    "title": "Drainage Upgrade",
    "location": {
      "lat": 28.571000668782,
      "lng": 77.24534088856525,
      "address": "Hotspot Center 10",
      "district": "Demo District B"
    },
    "priorityScore": 81,
    "estimatedCost": 17,
    "populationImpact": 94507,
    "urgency": "HIGH",
    "expectedImpact": "HIGH",
    "evidenceId": "EVD-110"
  }
];
export const mockEvidences: Evidence[] = [
  {
    "id": "EVD-DEMO-1",
    "recommendationId": "REC-DEMO-1",
    "reportCount": 4821,
    "trendPercentage": 38,
    "infrastructureGap": "HIGH",
    "populationImpact": 82000,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 92,
      "severity": 96,
      "urgency": 95,
      "populationImpact": 90,
      "costEfficiency": 91
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 94,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-102",
    "recommendationId": "REC-102",
    "reportCount": 4691,
    "trendPercentage": 44,
    "infrastructureGap": "CRITICAL",
    "populationImpact": 42020,
    "urgency": "CRITICAL",
    "scoreBreakdown": {
      "demand": 85,
      "severity": 70,
      "urgency": 81,
      "populationImpact": 89,
      "costEfficiency": 91
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 90,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-103",
    "recommendationId": "REC-103",
    "reportCount": 2597,
    "trendPercentage": 80,
    "infrastructureGap": "HIGH",
    "populationImpact": 51085,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 72,
      "severity": 91,
      "urgency": 85,
      "populationImpact": 84,
      "costEfficiency": 72
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 97,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-104",
    "recommendationId": "REC-104",
    "reportCount": 3026,
    "trendPercentage": 27,
    "infrastructureGap": "HIGH",
    "populationImpact": 15593,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 71,
      "severity": 94,
      "urgency": 89,
      "populationImpact": 99,
      "costEfficiency": 77
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 97,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-105",
    "recommendationId": "REC-105",
    "reportCount": 2108,
    "trendPercentage": 66,
    "infrastructureGap": "HIGH",
    "populationImpact": 76396,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 73,
      "severity": 98,
      "urgency": 91,
      "populationImpact": 79,
      "costEfficiency": 91
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 95,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-106",
    "recommendationId": "REC-106",
    "reportCount": 2612,
    "trendPercentage": 28,
    "infrastructureGap": "HIGH",
    "populationImpact": 80528,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 70,
      "severity": 82,
      "urgency": 92,
      "populationImpact": 77,
      "costEfficiency": 91
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 93,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-107",
    "recommendationId": "REC-107",
    "reportCount": 2494,
    "trendPercentage": 14,
    "infrastructureGap": "CRITICAL",
    "populationImpact": 17315,
    "urgency": "CRITICAL",
    "scoreBreakdown": {
      "demand": 82,
      "severity": 81,
      "urgency": 77,
      "populationImpact": 74,
      "costEfficiency": 84
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 86,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-108",
    "recommendationId": "REC-108",
    "reportCount": 4130,
    "trendPercentage": 37,
    "infrastructureGap": "CRITICAL",
    "populationImpact": 41573,
    "urgency": "CRITICAL",
    "scoreBreakdown": {
      "demand": 86,
      "severity": 83,
      "urgency": 93,
      "populationImpact": 70,
      "costEfficiency": 89
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 87,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-109",
    "recommendationId": "REC-109",
    "reportCount": 3653,
    "trendPercentage": 62,
    "infrastructureGap": "HIGH",
    "populationImpact": 21026,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 86,
      "severity": 81,
      "urgency": 72,
      "populationImpact": 76,
      "costEfficiency": 83
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 87,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  },
  {
    "id": "EVD-110",
    "recommendationId": "REC-110",
    "reportCount": 4370,
    "trendPercentage": 42,
    "infrastructureGap": "HIGH",
    "populationImpact": 94507,
    "urgency": "HIGH",
    "scoreBreakdown": {
      "demand": 89,
      "severity": 73,
      "urgency": 75,
      "populationImpact": 86,
      "costEfficiency": 81
    },
    "calculationMethodology": "Priority Score = Demand + Severity + Urgency + Infrastructure Gap + Population Impact + Cost Efficiency",
    "confidence": 94,
    "dataSources": [
      "Citizen Report Aggregation",
      "Historical Geospatial Data",
      "Municipal Infrastructure Index"
    ]
  }
];

export const mockUser: User = {
  id: 'USR-ME',
  name: 'Demo Official',
  email: 'official@demo.com',
  role: 'Government'
};
