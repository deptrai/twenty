import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import type { Deal, DealStage } from '../types/customer-deal';

const KanbanContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
`;

const Column = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 300px;
  padding: 16px;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ColumnTitle = styled.h3`
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
  text-transform: uppercase;
`;

const ColumnCount = styled.span`
  background: #2a2a2a;
  color: #a0a0a0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const DealCard = styled.div`
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const DealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const DealCustomer = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

const DealProperty = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const DealValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #22c55e;
  text-align: right;
`;

const DealMeta = styled.div`
  align-items: center;
  border-top: 1px solid #2a2a2a;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
`;

const DealAgent = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AgentAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
`;

const Commission = styled.div`
  font-size: 12px;
  color: #f59e0b;
  font-weight: 500;
`;

const EmptyState = styled.div`
  background: #0d0d0d;
  border: 1px dashed #2a2a2a;
  border-radius: 8px;
  color: #6b7280;
  font-size: 14px;
  padding: 24px;
  text-align: center;
`;

interface DealKanbanProps {
  deals: Deal[];
  onDealClick: (dealId: string) => void;
}

export const DealKanban = ({ deals, onDealClick }: DealKanbanProps) => {
  const { t } = useLingui();

  const STAGES: { key: DealStage; label: string; color: string }[] = [
    { key: 'NEW', label: t`New`, color: '#6b7280' },
    { key: 'QUALIFIED', label: t`Qualified`, color: '#3b82f6' },
    { key: 'PROPOSAL', label: t`Proposal`, color: '#8b5cf6' },
    { key: 'NEGOTIATION', label: t`Negotiation`, color: '#f59e0b' },
    { key: 'WON', label: t`Won`, color: '#22c55e' },
    { key: 'LOST', label: t`Lost`, color: '#ef4444' },
  ];

  const formatCurrency = (value: number) => {
    return (value / 1000000000).toFixed(1) + 'B';
  };

  const formatCommission = (commission: number) => {
    return (commission / 1000000).toFixed(0) + 'M';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const dealsByStage = (stage: DealStage) => {
    return deals.filter((deal) => deal.stage === stage);
  };

  return (
    <KanbanContainer>
      {STAGES.map((stage) => {
        const stageDeals = dealsByStage(stage.key);
        return (
          <Column key={stage.key}>
            <ColumnHeader>
              <ColumnTitle style={{ color: stage.color }}>
                {stage.label}
              </ColumnTitle>
              <ColumnCount>{stageDeals.length}</ColumnCount>
            </ColumnHeader>

            {stageDeals.length === 0 ? (
              <EmptyState>{t`No deals in ${stage.label.toLowerCase()}`}</EmptyState>
            ) : (
              stageDeals.map((deal) => (
                <DealCard key={deal.id} onClick={() => onDealClick(deal.id)}>
                  <DealHeader>
                    <div>
                      <DealCustomer>{deal.customerName}</DealCustomer>
                      <DealProperty>{deal.propertyName}</DealProperty>
                    </div>
                    <DealValue>{formatCurrency(deal.dealValue)}</DealValue>
                  </DealHeader>

                  {deal.notes && (
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '8px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {deal.notes}
                    </div>
                  )}

                  <DealMeta>
                    <DealAgent>
                      <AgentAvatar>
                        {deal.assignedAgentName
                          ? getInitials(deal.assignedAgentName)
                          : '??'}
                      </AgentAvatar>
                      <span>{deal.assignedAgentName || t`Unassigned`}</span>
                    </DealAgent>
                    <Commission>
                      💰 {formatCommission(deal.commission)}
                    </Commission>
                  </DealMeta>
                </DealCard>
              ))
            )}
          </Column>
        );
      })}
    </KanbanContainer>
  );
};
