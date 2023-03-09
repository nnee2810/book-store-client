import { StatsTimeMode } from "../interfaces/stats.interface"

export interface GetStatsDto {
  timeMode: StatsTimeMode | string
  timeValue: string
}
