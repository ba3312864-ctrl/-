
export enum AlgerianRegion {
  TELL_AR = 'الشمال (التل)',
  TELL_EN = 'North (Tell)',
  TELL_FR = 'Le Nord (Tell)',
  HIGHLANDS_AR = 'الهضاب العليا',
  HIGHLANDS_EN = 'Highlands',
  HIGHLANDS_FR = 'Hauts Plateaux',
  SAHARA_AR = 'الصحراء والجنوب',
  SAHARA_EN = 'Sahara & South',
  SAHARA_FR = 'Sahara & Sud'
}

export type CropCategory = 'grain' | 'vegetable' | 'fruit' | 'legume';

export interface RegionalDate {
  ar: string;
  en: string;
  fr: string;
}

export interface CropInfo {
  id: string;
  name_ar: string;
  name_en: string;
  name_fr: string;
  type: CropCategory;
  planting_ar: string;
  planting_en: string;
  planting_fr: string;
  regionalPlanting?: {
    north: RegionalDate;
    highlands: RegionalDate;
    sahara: RegionalDate;
  };
  harvest_ar: string;
  harvest_en: string;
  harvest_fr: string;
  regionalHarvest?: {
    north: RegionalDate;
    highlands: RegionalDate;
    sahara: RegionalDate;
  };
  desc_ar: string;
  desc_en: string;
  desc_fr: string;
  ext_desc_ar?: string;
  ext_desc_en?: string;
  ext_desc_fr?: string;
  icon: string;
  imageUrl?: string;
  regions_ar: string[];
  regions_en: string[];
  regions_fr: string[];
  nutrients?: NutrientSymptom[];
  growthStages?: GrowthStage[];
  seasonalCategory: number[];
}

export interface NutrientSymptom {
  element_ar: string;
  element_en: string;
  element_fr: string;
  symptom_ar: string;
  symptom_en: string;
  symptom_fr: string;
  solution_ar: string;
  solution_en: string;
  solution_fr: string;
}

export interface GrowthStage {
  name_ar: string;
  name_en: string;
  name_fr: string;
  duration_ar: string;
  duration_en: string;
  duration_fr: string;
  care_ar: string;
  care_en: string;
  care_fr: string;
  icon: string;
}

export interface LibraryArticle {
  id: string;
  category_ar: string;
  category_en: string;
  category_fr: string;
  title_ar: string;
  title_en: string;
  title_fr: string;
  content_ar: string;
  content_en: string;
  content_fr: string;
  icon: string;
}

export interface SeasonalAdvice {
  season_ar: string;
  season_en: string;
  season_fr: string;
  range_ar: string;
  range_en: string;
  range_fr: string;
  startMonth: number;
  endMonth: number;
  activities_ar: string[];
  activities_en: string[];
  activities_fr: string[];
  tips_ar: string[];
  tips_en: string[];
  tips_fr: string[];
  color: string;
}

export type Language = 'ar' | 'en' | 'fr';
export type UserRegion = 'north' | 'highlands' | 'sahara';

export interface Reminder {
  cropId: string;
  type: 'planting' | 'harvest' | 'care';
  enabled: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
