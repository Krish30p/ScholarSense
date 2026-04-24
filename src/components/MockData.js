export const mockData = {
  summary: {
    mean: 61.2,
    std_dev: 16.4,
    pass_rate: 65.5,
    at_risk_count: 6
  },
  distribution: [
    { name: '0-10', count: 0 },
    { name: '11-20', count: 1 },
    { name: '21-30', count: 2 },
    { name: '31-40', count: 4 },
    { name: '41-50', count: 3 },
    { name: '51-60', count: 5 },
    { name: '61-70', count: 6 },
    { name: '71-80', count: 4 },
    { name: '81-90', count: 3 },
    { name: '91-100', count: 2 }
  ],
  health: {
    status: 'POLARIZED',
    kurtosis: -1.24,
    skewness: 0.15,
    median: 62.0,
    iqr: 24.5
  },
  students: [
    { id: 'STU-001', score: 28, z_score: -2.02, percentile: 2, delta: -33.2, status: 'AT-RISK' },
    { id: 'STU-002', score: 31, z_score: -1.84, percentile: 4, delta: -30.2, status: 'AT-RISK' },
    { id: 'STU-003', score: 33, z_score: -1.72, percentile: 6, delta: -28.2, status: 'AT-RISK' },
    { id: 'STU-004', score: 35, z_score: -1.60, percentile: 8, delta: -26.2, status: 'AT-RISK' },
    { id: 'STU-005', score: 36, z_score: -1.54, percentile: 10, delta: -25.2, status: 'AT-RISK' },
    { id: 'STU-006', score: 36, z_score: -1.54, percentile: 10, delta: -25.2, status: 'AT-RISK' },
    { id: 'STU-007', score: 42, z_score: -1.17, percentile: 18, delta: -19.2, status: 'NOMINAL' },
    { id: 'STU-008', score: 45, z_score: -0.99, percentile: 22, delta: -16.2, status: 'NOMINAL' },
    { id: 'STU-009', score: 48, z_score: -0.80, percentile: 25, delta: -13.2, status: 'NOMINAL' },
    { id: 'STU-010', score: 50, z_score: -0.68, percentile: 30, delta: -11.2, status: 'NOMINAL' },
    { id: 'STU-011', score: 52, z_score: -0.56, percentile: 35, delta: -9.2, status: 'NOMINAL' },
    { id: 'STU-012', score: 55, z_score: -0.38, percentile: 40, delta: -6.2, status: 'NOMINAL' },
    { id: 'STU-013', score: 58, z_score: -0.20, percentile: 45, delta: -3.2, status: 'NOMINAL' },
    { id: 'STU-014', score: 60, z_score: -0.07, percentile: 48, delta: -1.2, status: 'NOMINAL' },
    { id: 'STU-015', score: 62, z_score: 0.05, percentile: 52, delta: 0.8, status: 'NOMINAL' },
    { id: 'STU-016', score: 64, z_score: 0.17, percentile: 55, delta: 2.8, status: 'NOMINAL' },
    { id: 'STU-017', score: 65, z_score: 0.23, percentile: 58, delta: 3.8, status: 'NOMINAL' },
    { id: 'STU-018', score: 68, z_score: 0.41, percentile: 62, delta: 6.8, status: 'NOMINAL' },
    { id: 'STU-019', score: 70, z_score: 0.54, percentile: 68, delta: 8.8, status: 'NOMINAL' },
    { id: 'STU-020', score: 72, z_score: 0.66, percentile: 72, delta: 10.8, status: 'NOMINAL' },
    { id: 'STU-021', score: 75, z_score: 0.84, percentile: 75, delta: 13.8, status: 'NOMINAL' },
    { id: 'STU-022', score: 78, z_score: 1.02, percentile: 80, delta: 16.8, status: 'NOMINAL' },
    { id: 'STU-023', score: 80, z_score: 1.15, percentile: 82, delta: 18.8, status: 'NOMINAL' },
    { id: 'STU-024', score: 82, z_score: 1.27, percentile: 85, delta: 20.8, status: 'NOMINAL' },
    { id: 'STU-025', score: 85, z_score: 1.45, percentile: 88, delta: 23.8, status: 'NOMINAL' },
    { id: 'STU-026', score: 88, z_score: 1.63, percentile: 92, delta: 26.8, status: 'NOMINAL' },
    { id: 'STU-027', score: 90, z_score: 1.76, percentile: 95, delta: 28.8, status: 'NOMINAL' },
    { id: 'STU-028', score: 92, z_score: 1.88, percentile: 97, delta: 30.8, status: 'NOMINAL' },
    { id: 'STU-029', score: 95, z_score: 2.06, percentile: 99, delta: 33.8, status: 'NOMINAL' },
    { id: 'STU-030', score: 96, z_score: 2.12, percentile: 99, delta: 34.8, status: 'NOMINAL' }
  ]
};
