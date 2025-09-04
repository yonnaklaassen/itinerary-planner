export interface Trip {
  readonly id: string;          
  readonly userId: string; // owner_id      
  tripName: string;              
  destination: string;          
  startingDate: Date;            
  endingDate: Date;              
  readonly createdAt: Date;      
}