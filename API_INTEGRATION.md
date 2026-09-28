# CivicOS API Integration Guide

This document defines the REST API contracts required by the CivicOS frontend. The frontend is currently using mock data and service classes in `src/services/`. When the backend is ready, replace the mock implementations in the services with actual `fetch` or `axios` calls to these endpoints.

## 1. Citizen Services

### `POST /api/reports`
Submits a new citizen report.
- **Request Body**:
  ```json
  {
    "title": "String (optional)",
    "description": "String",
    "category": "String (Enum: Roads, Drainage, Water, Waste, Public Transport, Healthcare, Education, Electricity, Other)",
    "location": {
      "lat": "Number",
      "lng": "Number",
      "address": "String",
      "district": "String"
    },
    "images": ["Array of Strings (URLs)"],
    "audioUrl": "String (optional)"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "id": "String",
    "status": "Analyzing",
    "timestamp": "ISO Date String",
    "aiAnalysis": { ... }
  }
  ```

### `GET /api/reports`
Retrieves a list of reports.
- **Response**: Array of `CitizenReport` objects.

### `GET /api/reports/:id`
Retrieves a single report by ID.
- **Response**: `CitizenReport` object.

## 2. Civic Map Services

### `GET /api/hotspots`
Retrieves aggregated civic hotspots.
- **Response**: Array of `Hotspot` objects.

### `GET /api/hotspots/:id`
Retrieves a single hotspot by ID.

## 3. Prediction Services

### `GET /api/predictions`
Retrieves predictive risk intelligence.
- **Response**: Array of `Prediction` objects.

## 4. Policy Copilot Services

### `POST /api/copilot/recommend`
Generates an AI policy recommendation based on a query.
- **Request Body**:
  ```json
  {
    "query": "Where should we invest ₹100 crore?"
  }
  ```
- **Response**: Array of `Recommendation` objects (prioritized).

## 5. Evidence Services

### `GET /api/recommendations/:recommendationId/evidence`
Retrieves the verifiable evidence backing a specific AI recommendation.
- **Response**: `Evidence` object containing score breakdowns, datasets referenced, and confidence metrics.
