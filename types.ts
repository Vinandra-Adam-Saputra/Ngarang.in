export enum WritingStyle {
  FORMAL = "Formal (Baku & Profesional)",
  CASUAL = "Santai (Bahasa Sehari-hari)",
  FLOWERY = "Puitis (Layaknya Pujangga)",
  ACADEMIC = "Akademis (Sangat Ilmiah)"
}

export interface ReportState {
  activity: string;
  learning: string;
  obstacle: string;
}

export interface GeneratedReport {
  activity: string;
  learning: string;
  obstacle: string;
}

export type FieldType = 'activity' | 'learning' | 'obstacle';

export interface GenerationConfig {
  apiKey: string;
  style: WritingStyle;
}