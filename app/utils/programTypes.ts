/**
 * Shared program kerja types — used by both the admin store and the frontend ProkerCard.
 * Keeping types separate from the store avoids importing Pinia in frontend-nuxt.
 */

export interface ProgramLink {
  id?: number
  link_type: 'DOKUMENTASI' | 'AGENDA'
  ref_id: number
  title?: string       // title (doc) or judul (agenda)
  start_date?: string  // agenda only
  end_date?: string    // agenda only
  ket?: string         // agenda description
}
