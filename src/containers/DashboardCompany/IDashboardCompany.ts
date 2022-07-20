interface IDashboardCompany {
  is_pending: boolean
  parent_company: string
  patent_expiration_date: Date
  patent_grant_date: Date
  patent_number: string
  proceeding_filing_date: Date
  proceeding_status: string
  proceeding_status_category: string
  ptab_trial_num: string
  trade_name: string
}
export default IDashboardCompany
