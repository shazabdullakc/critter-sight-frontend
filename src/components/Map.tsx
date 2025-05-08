
import { useEffect } from "react";

interface MapProps {
  cameras: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    isOnline: boolean;
  }[];
}

// This is a placeholder component that would be replaced with a real mapping library
// like Leaflet, Google Maps, or MapBox in a real application
const Map = ({ cameras }: MapProps) => {
  useEffect(() => {
    // In a real app, this would initialize the map library
    console.log("Map initialized with cameras:", cameras);
  }, [cameras]);

  return (
    <div className="map-container bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
      <div className="text-center p-4">
        <p className="text-lg font-semibold">Interactive Map</p>
        <p className="text-sm text-muted-foreground">
          {cameras.length} cameras detected
        </p>
      </div>
      <div className="text-sm text-primary">
        {cameras.map((camera) => (
          <div key={camera.id} className="mb-2">
            <span className={camera.isOnline ? "camera-online" : "camera-offline"}>●</span> {camera.name} ({camera.latitude.toFixed(4)}, {camera.longitude.toFixed(4)})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
