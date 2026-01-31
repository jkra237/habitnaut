// Observation Pool - Barrel Export
export { observations, getObservationById, getObservationsByCategory, getObservationsByPattern } from './observation-library';
export { detectPatterns } from './pattern-detector';
export { 
  selectObservation, 
  recordShownObservation, 
  getInitialObservationState 
} from './observation-selector';
