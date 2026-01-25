
import { CropInfo, SeasonalAdvice, LibraryArticle } from './types';

const UNIFIED_LANDSCAPE_URL = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200';

export const AGRI_LIBRARY: LibraryArticle[] = [
  {
    id: 'soil-1',
    category_ar: 'التربة',
    category_en: 'Soil',
    category_fr: 'Sols',
    title_ar: 'التربة الطينية في الشمال',
    title_en: 'Clay Soil in the North',
    title_fr: 'Sols Argileux du Nord',
    content_ar: 'تتميز التربة في منطقة التل بخصوبة عالية وقدرة كبيرة على حبس المياه. نصيحة: تجنب الحرث المفرط عندما تكون التربة رطبة جداً لمنع التراص، واستخدم المادة العضوية لتحسين التهوية.',
    content_en: 'Northern Tell soil is highly fertile with great water retention. Tip: Avoid excessive plowing when very wet to prevent compaction.',
    content_fr: 'Le sol du Tell Nord est très fertile avec une grande rétention d\'eau. Conseil : évitez les labours excessifs lorsqu\'il est très humide.',
    icon: '🪴'
  },
  {
    id: 'fert-1',
    category_ar: 'التسميد',
    category_en: 'Fertilizing',
    category_fr: 'Fertilisation',
    title_ar: 'التسميد العضوي المستدام',
    title_en: 'Sustainable Organic Fertilizing',
    title_fr: 'Fertilisation Organique Durable',
    content_ar: 'يُفضل استخدام سماد الأغنام المخمر (الغباري) وتوزيعه في الخريف قبل الأمطار الأولى. يساهم ذلك في تحسين خصوبة التربة على المدى الطويل وتقليل الحاجة للأسمدة الكيميائية.',
    content_en: 'Use fermented sheep manure in autumn. This improves long-term soil fertility and reduces chemical fertilizer dependence.',
    content_fr: 'Utilisez du fumier de mouton fermenté en automne. Cela améliore la fertilité à long terme et réduit l\'usage d\'engrais chimiques.',
    icon: '💩'
  },
  {
    id: 'irrigation-1',
    category_ar: 'الري',
    category_en: 'Irrigation',
    category_fr: 'Irrigation',
    title_ar: 'الري بالتنقيط في البيوت البلاستيكية',
    title_en: 'Drip Irrigation in Greenhouses',
    title_fr: 'Goutte-à-goutte sous Serre',
    content_ar: 'أفضل طريقة لسقي الطماطم والفلفل في بسكرة والوادي. يسمح بالتحكم الدقيق في كمية المياه وتجنب الرطوبة الزائدة التي تسبب الأمراض الفطرية.',
    content_en: 'Best method for Biskra/El Oued tomatoes. Allows precise water control and avoids excess humidity.',
    content_fr: 'Meilleure méthode pour les tomates à Biskra/El Oued. Permet un contrôle précis et évite l\'excès d\'humidité.',
    icon: '💧'
  }
];

export const ALGERIAN_CROPS: CropInfo[] = [
  {
    id: 'wheat',
    name_ar: 'القمح الصلب',
    name_en: 'Durum Wheat',
    name_fr: 'Blé Dur',
    type: 'grain',
    planting_ar: 'نوفمبر - ديسمبر',
    planting_en: 'November - December',
    planting_fr: 'Novembre - Décembre',
    regionalPlanting: {
      north: { ar: '15 نوفمبر - 15 ديسمبر', en: 'Nov 15 - Dec 15', fr: '15 Nov - 15 Déc' },
      highlands: { ar: 'أكتوبر - نوفمبر', en: 'October - November', fr: 'Octobre - Novembre' },
      sahara: { ar: 'نوفمبر - جانفي', en: 'November - January', fr: 'Novembre - Janvier' }
    },
    harvest_ar: 'جوان - جويلية',
    harvest_en: 'June - July',
    harvest_fr: 'Juin - Juillet',
    desc_ar: 'المحصول الاستراتيجي الأول، تشتهر به ولايات تيارت، سطيف، وقالمة.',
    desc_en: 'Primary strategic crop, famous in Tiaret, Setif, and Guelma.',
    desc_fr: 'Première culture stratégique, réputée dans les wilayas de Tiaret, Sétif et Guelma.',
    icon: '🌾',
    imageUrl: UNIFIED_LANDSCAPE_URL,
    regions_ar: ['الهضاب العليا', 'الشمال'],
    regions_en: ['Highlands', 'North'],
    regions_fr: ['Hauts Plateaux', 'Nord'],
    seasonalCategory: [0, 1, 3]
  },
  {
    id: 'potato',
    name_ar: 'البطاطا',
    name_en: 'Potatoes',
    name_fr: 'Pomme de terre',
    type: 'vegetable',
    planting_ar: 'فيفري / أوت',
    planting_en: 'February / August',
    planting_fr: 'Février / Août',
    harvest_ar: 'ماي / نوفمبر',
    harvest_en: 'May / November',
    harvest_fr: 'Mai / Novembre',
    desc_ar: 'تنتج في عين الدفلى، معسكر، ووادي سوف طوال العام.',
    desc_en: 'Produced in Ain Defla, Mascara, and El Oued year-round.',
    desc_fr: 'Produite à Ain Defla, Mascara et El Oued tout au long de l\'année.',
    icon: '🥔',
    imageUrl: UNIFIED_LANDSCAPE_URL,
    regions_ar: ['الشمال', 'الصحراء'],
    regions_en: ['North', 'Sahara'],
    regions_fr: ['Nord', 'Sahara'],
    seasonalCategory: [0, 1, 2, 3]
  },
  {
    id: 'tomato',
    name_ar: 'الطماطم',
    name_en: 'Tomatoes',
    name_fr: 'Tomate',
    type: 'vegetable',
    planting_ar: 'مارس - أفريل',
    planting_en: 'March - April',
    planting_fr: 'Mars - Avril',
    harvest_ar: 'جويلية - أوت',
    harvest_en: 'July - August',
    harvest_fr: 'Juillet - Août',
    desc_ar: 'تنتج في البيوت البلاستيكية بالجنوب (بسكرة) وفي الحقول المفتوحة بالشمال.',
    desc_en: 'Produced in southern greenhouses (Biskra) and northern open fields.',
    desc_fr: 'Produite sous serres au Sud (Biskra) et en plein champ au Nord.',
    icon: '🍅',
    imageUrl: UNIFIED_LANDSCAPE_URL,
    regions_ar: ['بسكرة', 'مستغانم'],
    regions_en: ['Biskra', 'Mostaganem'],
    regions_fr: ['Biskra', 'Mostaganem'],
    seasonalCategory: [2, 3]
  },
  {
    id: 'dates',
    name_ar: 'التمور (دقلة نور)',
    name_en: 'Dates (Deglet Nour)',
    name_fr: 'Dattes (Deglet Nour)',
    type: 'fruit',
    planting_ar: 'مارس - أفريل',
    planting_en: 'March - April',
    planting_fr: 'Mars - Avril',
    harvest_ar: 'أكتوبر - نوفمبر',
    harvest_en: 'October - November',
    harvest_fr: 'Octobre - Novembre',
    desc_ar: 'ذهب الجزائر، تتركز زراعتها في بسكرة، الوادي، وورقلة.',
    desc_en: 'Algeria\'s gold, concentrated in Biskra, El Oued, and Ouargla.',
    desc_fr: 'L\'or de l\'Algérie, concentré à Biskra, El Oued et Ouargla.',
    icon: '🌴',
    imageUrl: UNIFIED_LANDSCAPE_URL,
    regions_ar: ['بسكرة', 'وادي سوف'],
    regions_en: ['Biskra', 'El Oued'],
    regions_fr: ['Biskra', 'El Oued'],
    seasonalCategory: [2, 0]
  }
];

export const SEASONAL_GUIDE: SeasonalAdvice[] = [
  {
    season_ar: 'الخريف', season_en: 'Autumn', season_fr: 'Automne',
    range_ar: 'سبتمبر - نوفمبر', range_en: 'September - November', range_fr: 'Septembre - Novembre',
    startMonth: 8, endMonth: 10, color: '#D97706',
    activities_ar: ['تحضير التربة', 'حرث الأرض', 'زرع الحبوب'],
    activities_en: ['Soil preparation', 'Plowing', 'Planting grains'],
    activities_fr: ['Préparation du sol', 'Labourage', 'Semis des céréales'],
    tips_ar: ['ابدأ بجمع الزيتون المبكر'], 
    tips_en: ['Start early olive harvesting'],
    tips_fr: ['Commencez la récolte précoce des olives'],
  },
  {
    season_ar: 'الشتاء', season_en: 'Winter', season_fr: 'Hiver',
    range_ar: 'ديسمبر - فيفري', range_en: 'December - February', range_fr: 'Décembre - Février',
    startMonth: 11, endMonth: 1, color: '#2563EB',
    activities_ar: ['تقليم الأشجار', 'تسميد الأرض'],
    activities_en: ['Tree pruning', 'Fertilization'],
    activities_fr: ['Taille des arbres', 'Fertilisation'],
    tips_ar: ['احمِ المحاصيل من الصقيع'], 
    tips_en: ['Protect crops from frost'],
    tips_fr: ['Protégez les cultures du gel'],
  },
  {
    season_ar: 'الربيع', season_en: 'Spring', season_fr: 'Printemps',
    range_ar: 'مارس - ماي', range_en: 'March - May', range_fr: 'Mars - Mai',
    startMonth: 2, endMonth: 4, color: '#059669',
    activities_ar: ['مكافحة الآفات', 'تلقيح النخيل'],
    activities_en: ['Pest control', 'Palm pollination'],
    activities_fr: ['Lutte contre les parasites', 'Pollinisation des palmiers'],
    tips_ar: ['راقب الأمراض الفطرية'], 
    tips_en: ['Watch for fungal diseases'],
    tips_fr: ['Surveillez les maladies fongiques'],
  },
  {
    season_ar: 'الصيف', season_en: 'Summer', season_fr: 'Été',
    range_ar: 'جوان - أوت', range_en: 'June - August', range_fr: 'Juin - Août',
    startMonth: 5, endMonth: 7, color: '#EAB308',
    activities_ar: ['حصاد الحبوب', 'جني الفواكه'],
    activities_en: ['Grain harvest', 'Picking fruits'],
    activities_fr: ['Moisson des céréales', 'Récolte des fruits'],
    tips_ar: ['احمِ المحاصيل من الشهيلي'], 
    tips_en: ['Protect crops from Sirocco'],
    tips_fr: ['Protégez les cultures du Sirocco (Siroco)'],
  }
];

export const MONTHS_AR = ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
export const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
