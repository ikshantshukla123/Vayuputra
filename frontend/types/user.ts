/** User profile stored locally */
export interface UserProfile {
  username: string;
  location?: {
    lat: number;
    lng: number;
    label?: string;
  };
  healthConditions?: string[];
  ageGroup?: "child" | "adult" | "senior";
  createdAt: string;
}
