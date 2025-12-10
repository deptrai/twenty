import { CommissionReports } from '@/real-estate/components/CommissionReports';
import { mockCommissions } from '@/real-estate/data/sales-tools-mock';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';

const StyledHeader = styled.div`
  margin-bottom: 24px;
  padding: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0 0 8px 0;
`;

const StyledSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.font.color.tertiary};
  margin: 0;
`;

const StyledContent = styled.div`
  padding: 0 20px 20px 20px;
`;

export const CommissionReportsPage = () => {
  const { t } = useLingui();

  // Calculate stats from mock data
  const paidCommissions = mockCommissions.filter((c) => c.status === 'PAID');
  const pendingCommissions = mockCommissions.filter(
    (c) => c.status === 'PENDING',
  );
  const approvedCommissions = mockCommissions.filter(
    (c) => c.status === 'APPROVED',
  );

  const totalPaid = paidCommissions.reduce((sum, c) => sum + c.amount, 0);
  const totalPending = pendingCommissions.reduce((sum, c) => sum + c.amount, 0);
  const totalApproved = approvedCommissions.reduce(
    (sum, c) => sum + c.amount,
    0,
  );

  // Group by agent
  const agentMap = new Map<string, { amount: number; deals: number }>();
  mockCommissions.forEach((c) => {
    if (c.status === 'PAID' && c.agentName) {
      const existing = agentMap.get(c.agentName) || { amount: 0, deals: 0 };
      agentMap.set(c.agentName, {
        amount: existing.amount + c.amount,
        deals: existing.deals + 1,
      });
    }
  });

  const agentCommissions = Array.from(agentMap.entries())
    .map(([agent, data]) => ({
      agent,
      amount: data.amount,
      deals: data.deals,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Mock trend data (last 6 months)
  const trendData = [
    { month: 'Jul', amount: 450000000 },
    { month: 'Aug', amount: 620000000 },
    { month: 'Sep', amount: 580000000 },
    { month: 'Oct', amount: 750000000 },
    { month: 'Nov', amount: 890000000 },
    { month: 'Dec', amount: totalPaid },
  ];

  const handleExport = () => {
    const csvHeader =
      'Report Type,Period,Total Paid,Total Pending,Total Approved\n';
    const csvData = `Commission Report,This Month,${totalPaid},${totalPending},${totalApproved}\n\n`;
    const csvAgentHeader = 'Agent,Amount,Deals\n';
    const csvAgents = agentCommissions
      .map((a) => `${a.agent},${a.amount},${a.deals}`)
      .join('\n');

    const csvContent = csvHeader + csvData + csvAgentHeader + csvAgents;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `commission-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <PageContainer>
      <StyledHeader>
        <StyledTitle>{t`📊 Commission Reports`}</StyledTitle>
        <StyledSubtitle>
          {t`Sales performance and commission analytics`}
        </StyledSubtitle>
      </StyledHeader>
      <StyledContent>
        <CommissionReports
          agentCommissions={agentCommissions}
          trendData={trendData}
          totalPaid={totalPaid}
          totalPending={totalPending}
          totalApproved={totalApproved}
          paidCount={paidCommissions.length}
          pendingCount={pendingCommissions.length}
          approvedCount={approvedCommissions.length}
          onExport={handleExport}
        />
      </StyledContent>
    </PageContainer>
  );
};
