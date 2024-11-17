export class ReadGetAllDrsDto {
  response?: {
    id: number;
    name: string;
    lastName: string;
    rating: number;
    degree: string;
    city: string;
    hospitals?: { id: string; name: string }[];
    specializations: { value: string }[];
    imageName: string | null;
  }[];
  totalDoctors?: number;
  totalPages?: number;
  error?: string;
  message?: string;
}
