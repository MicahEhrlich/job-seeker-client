import type { Job } from "../types";

export const MOCK_JOBS:Job[] = [
  {
    id: 1,
    company_name: 'Meta',
    position: 'Frontend Engineer',
    status: 'interviewing',
    applied_date: '2025-05-01',
    notes: '',
    interview_stages: [
      {
        stage: 'HR Call', person: 'Sarah Lee', date: '2025-05-02', status: 'done',
        jobId: 1,
        stageId: 1
      },
      {
        stage: 'Tech Interview', person: 'John Dev', date: '2025-05-06', status: 'upcoming',
        jobId: 1,
        stageId: 2
      },
      {
        stage: 'CTO Call', person: '', date: '', status: 'pending',
        jobId: 1,
        stageId: 3
      }
    ]
  },
  {
    id: 2,
    company_name: 'Google',
    position: 'SWE Intern',
    status: 'applied',
    applied_date: '2025-05-03',
    notes: '',
  },
  {
    id: 3,
    company_name: 'Stripe',
    position: 'Backend Engineer',
    status: 'offered',
    applied_date: '2025-04-20',
    offer_details: '$130k + equity | Start date: June 15',
  },
]