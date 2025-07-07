export interface EmailJob {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}
