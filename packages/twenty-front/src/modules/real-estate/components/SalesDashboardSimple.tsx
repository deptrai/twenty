import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import type { AgentStats } from '../types/sales-tools';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const StyledStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledStatCard = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledStatLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 12px;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-transform: uppercase;
`;

const StyledStatValue = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledStatSubtext = styled.div`
  color: ${({ theme }) => theme.font.color.secondary};
  font-size: 14px;
`;

const StyledSection = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0 0 ${({ theme }) => theme.spacing(5)} 0;
`;

const StyledMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing(6)};
`;

const StyledMetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledMetricLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 13px;
`;

const StyledMetricValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 24px;
  font-weight: 600;
`;

const StyledCommissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledCommissionItem = styled.div`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledCommissionLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.font.color.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledCommissionValue = styled.div<{ $color?: string }>`
  color: ${({ theme, $color }) => $color || theme.font.color.primary};
  font-size: 20px;
  font-weight: 600;
`;

interface SalesDashboardSimpleProps {
  stats: AgentStats;
}

export const SalesDashboardSimple = ({ stats }: SalesDashboardSimpleProps) => {
  const { t } = useLingui();

  const formatCurrency = (value: number) => {
    return (value / 1000000000).toFixed(1) + 'B VND';
  };

  const formatCommission = (value: number) => {
    return (value / 1000000).toFixed(0) + 'M VND';
  };

  return (
    <StyledContainer>
      <StyledStatsGrid>
        <StyledStatCard>
          <StyledStatLabel>{t`Total Deals`}</StyledStatLabel>
          <StyledStatValue>{stats.totalDeals}</StyledStatValue>
          <StyledStatSubtext>
            {stats.wonDeals} {t`won`} • {stats.lostDeals} {t`lost`}
          </StyledStatSubtext>
        </StyledStatCard>

        <StyledStatCard>
          <StyledStatLabel>{t`Total Revenue`}</StyledStatLabel>
          <StyledStatValue>
            {formatCurrency(stats.totalRevenue)}
          </StyledStatValue>
          <StyledStatSubtext>
            {t`Avg:`} {formatCurrency(stats.avgDealValue)}
          </StyledStatSubtext>
        </StyledStatCard>

        <StyledStatCard>
          <StyledStatLabel>{t`Total Commission`}</StyledStatLabel>
          <StyledStatValue>
            {formatCurrency(stats.totalCommission)}
          </StyledStatValue>
          <StyledStatSubtext>
            {stats.winRate}% {t`win rate`}
          </StyledStatSubtext>
        </StyledStatCard>

        <StyledStatCard>
          <StyledStatLabel>{t`Active Leads`}</StyledStatLabel>
          <StyledStatValue>{stats.activeLeads}</StyledStatValue>
          <StyledStatSubtext>
            {stats.overdueLeads > 0
              ? `${stats.overdueLeads} ${t`overdue`}`
              : t`All on track`}
          </StyledStatSubtext>
        </StyledStatCard>
      </StyledStatsGrid>

      <StyledSection>
        <StyledSectionTitle>{t`Performance Metrics`}</StyledSectionTitle>
        <StyledMetricsGrid>
          <StyledMetricItem>
            <StyledMetricLabel>{t`Deal Success Rate`}</StyledMetricLabel>
            <StyledMetricValue>{stats.winRate}%</StyledMetricValue>
          </StyledMetricItem>

          <StyledMetricItem>
            <StyledMetricLabel>{t`Won Deals`}</StyledMetricLabel>
            <StyledMetricValue>{stats.wonDeals}</StyledMetricValue>
            <div style={{ fontSize: '14px', marginTop: '4px' }}>
              {t`of`} {stats.totalDeals} {t`total`}
            </div>
          </StyledMetricItem>

          <StyledMetricItem>
            <StyledMetricLabel>{t`Active Pipeline`}</StyledMetricLabel>
            <StyledMetricValue>
              {stats.totalDeals - stats.wonDeals - stats.lostDeals}
            </StyledMetricValue>
            <div style={{ fontSize: '14px', marginTop: '4px' }}>
              {t`deals in progress`}
            </div>
          </StyledMetricItem>
        </StyledMetricsGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>{t`Commission Breakdown`}</StyledSectionTitle>
        <StyledCommissionGrid>
          <StyledCommissionItem>
            <StyledCommissionLabel>{t`Pending`}</StyledCommissionLabel>
            <StyledCommissionValue $color="#f59e0b">
              {formatCommission(stats.pendingCommission)}
            </StyledCommissionValue>
          </StyledCommissionItem>

          <StyledCommissionItem>
            <StyledCommissionLabel>{t`Approved`}</StyledCommissionLabel>
            <StyledCommissionValue $color="#3b82f6">
              {formatCommission(stats.approvedCommission)}
            </StyledCommissionValue>
          </StyledCommissionItem>

          <StyledCommissionItem>
            <StyledCommissionLabel>{t`Paid`}</StyledCommissionLabel>
            <StyledCommissionValue $color="#22c55e">
              {formatCommission(stats.paidCommission)}
            </StyledCommissionValue>
          </StyledCommissionItem>
        </StyledCommissionGrid>
      </StyledSection>
    </StyledContainer>
  );
};
