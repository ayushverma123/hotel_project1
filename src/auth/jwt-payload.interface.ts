export interface JwtPayload {
  email: string;
  sub: {
    name: string;
  };
  // Add other relevant fields from your JWT payload if needed
}