/**
 * A simple geographic coordinate used for origin/destination nodes.
 */
export interface Coordinate {
  lat: number;
  lng: number;
  // Optional human-friendly location name (city, hub, warehouse)
  name?: string;
}

/**
 * A single timeline event for a shipment. `time` is stored as a
 * localized string for display purposes.
 */
export interface TimelineEvent {
  status: string;
  time: string;
}

/**
 * Canonical shipment shape used across the UI and API.
 * - `progress` is a 0-100 integer used for progress bars and map position
 * - `timeline` is an ordered array of `TimelineEvent` items
 */
export interface Shipment {
  id: string;
  customerName: string;
  packageName: string;
  origin: Coordinate;
  destination: Coordinate;
  progress: number; // 0 to 100
  status: string;
  timeline: TimelineEvent[];
}
