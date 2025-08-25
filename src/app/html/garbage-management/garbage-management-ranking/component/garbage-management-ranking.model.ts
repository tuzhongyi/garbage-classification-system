export interface IGarbageManagementRankingData {
  name: string;
  value: number;
  language: string;
  unit: string;
}

export interface IGarbageManagementRankingConverter<T = any> {
  convert(source: T): IGarbageManagementRankingData;
}
