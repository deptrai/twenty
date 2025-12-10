import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const StyledFilters = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  background: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.font.color.primary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledSummaryCard = styled.div<{ $color?: string }>`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-left: 4px solid ${({ $color }) => $color || '#3b82f6'};
`;

const StyledCardTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.font.color.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledCardValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledCardSubtext = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 13px;
`;

const StyledChartCard = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledChartTitle = styled.h3`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing(5)} 0;
  padding-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledBarChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledBarLabel = styled.div`
  min-width: 120px;
  font-size: 14px;
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledBarTrack = styled.div`
  flex: 1;
  height: 24px;
  background: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  overflow: hidden;
  position: relative;
`;

const StyledBarFill = styled.div<{ $percent: number }>`
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  border-radius: ${({ theme }) => theme.border.radius.sm};
  height: 100%;
  transition: width 0.3s ease;
  width: ${({ $percent }) => $percent}%;
`;

const StyledBarValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  font-weight: 500;
  min-width: 150px;
  text-align: right;
`;

const StyledTrendChart = styled.div`
  height: 300px;
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledTrendBar = styled.div<{ $height: number }>`
  flex: 1;
  height: ${({ $height }) => $height}%;
  background: linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%);
  border-radius: ${({ theme }) =>
    `${theme.border.radius.sm} ${theme.border.radius.sm} 0 0`};
  position: relative;
  transition: height 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledTrendLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  display: flex;
  font-size: 12px;
  justify-content: space-around;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

interface AgentCommission {
  agent: string;
  amount: number;
  deals: number;
}

interface TrendData {
  month: string;
  amount: number;
}

interface CommissionReportsProps {
  agentCommissions: AgentCommission[];
  trendData: TrendData[];
  totalPaid: number;
  totalPending: number;
  totalApproved: number;
  paidCount: number;
  pendingCount: number;
  approvedCount: number;
  onExport: () => void;
}

export const CommissionReports = ({
  agentCommissions,
  trendData,
  totalPaid,
  totalPending,
  totalApproved,
  paidCount,
  pendingCount,
  approvedCount,
  onExport,
}: CommissionReportsProps) => {
  const { t } = useLingui();

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B VND';
    }
    return (value / 1000000).toFixed(0) + 'M VND';
  };

  const maxAgentAmount = Math.max(...agentCommissions.map((a) => a.amount));
  const maxTrendAmount = Math.max(...trendData.map((t) => t.amount));

  return (
    <StyledContainer>
      <StyledFilters>
        <StyledSelect>
          <option value="this-month">{t`This Month`}</option>
          <option value="last-month">{t`Last Month`}</option>
          <option value="this-quarter">{t`This Quarter`}</option>
          <option value="this-year">{t`This Year`}</option>
        </StyledSelect>
        <StyledSelect>
          <option value="all">{t`All Projects`}</option>
          <option value="sunrise-city">Sunrise City</option>
          <option value="green-hill">Green Hill Garden</option>
        </StyledSelect>
        <StyledSelect>
          <option value="all">{t`All Agents`}</option>
          <option value="luis">Luis Phan</option>
          <option value="john">John Doe</option>
        </StyledSelect>
        <StyledButton onClick={onExport}>⬇ {t`Export`}</StyledButton>
      </StyledFilters>

      <StyledSummaryGrid>
        <StyledSummaryCard $color="#22c55e">
          <StyledCardTitle>{t`Total Paid`}</StyledCardTitle>
          <StyledCardValue>{formatCurrency(totalPaid)}</StyledCardValue>
          <StyledCardSubtext>
            {paidCount} {t`commissions`}
          </StyledCardSubtext>
        </StyledSummaryCard>

        <StyledSummaryCard $color="#eab308">
          <StyledCardTitle>{t`Total Pending`}</StyledCardTitle>
          <StyledCardValue>{formatCurrency(totalPending)}</StyledCardValue>
          <StyledCardSubtext>
            {pendingCount} {t`commissions`}
          </StyledCardSubtext>
        </StyledSummaryCard>

        <StyledSummaryCard $color="#3b82f6">
          <StyledCardTitle>{t`Total Approved`}</StyledCardTitle>
          <StyledCardValue>{formatCurrency(totalApproved)}</StyledCardValue>
          <StyledCardSubtext>
            {approvedCount} {t`commissions`}
          </StyledCardSubtext>
        </StyledSummaryCard>
      </StyledSummaryGrid>

      <StyledChartCard>
        <StyledChartTitle>{t`Commission by Agent (This Month)`}</StyledChartTitle>
        <StyledBarChart>
          {agentCommissions.map((agent) => (
            <StyledBarRow key={agent.agent}>
              <StyledBarLabel>{agent.agent}</StyledBarLabel>
              <StyledBarTrack>
                <StyledBarFill
                  $percent={(agent.amount / maxAgentAmount) * 100}
                />
              </StyledBarTrack>
              <StyledBarValue>
                {formatCurrency(agent.amount)} ({agent.deals} {t`deals`})
              </StyledBarValue>
            </StyledBarRow>
          ))}
        </StyledBarChart>
      </StyledChartCard>

      <StyledChartCard>
        <StyledChartTitle>{t`Commission Trend (Last 6 Months)`}</StyledChartTitle>
        <StyledTrendChart>
          {trendData.map((data) => (
            <StyledTrendBar
              key={data.month}
              $height={(data.amount / maxTrendAmount) * 100}
              title={`${data.month}: ${formatCurrency(data.amount)}`}
            />
          ))}
        </StyledTrendChart>
        <StyledTrendLabel>
          {trendData.map((data) => (
            <div key={data.month}>{data.month}</div>
          ))}
        </StyledTrendLabel>
      </StyledChartCard>
    </StyledContainer>
  );
};
