import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import type { Deal, DealActivity } from '../types/customer-deal';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 24px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px 0;
`;

const DealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const DealInfo = styled.div`
  flex: 1;
`;

const DealTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const DealSubtitle = styled.p`
  font-size: 14px;
  color: #a0a0a0;
  margin: 0;
`;

const StageIndicator = styled.div<{ stage: string }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ stage }) => {
    switch (stage) {
      case 'NEW':
        return '#374151';
      case 'QUALIFIED':
        return '#1e40af';
      case 'PROPOSAL':
        return '#6d28d9';
      case 'NEGOTIATION':
        return '#b45309';
      case 'WON':
        return '#15803d';
      case 'LOST':
        return '#991b1b';
      default:
        return '#374151';
    }
  }};
  color: #ffffff;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

const PropertyCard = styled.div`
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
  }
`;

const PropertyName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
`;

const PropertyMeta = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  padding-left: 32px;

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 28px;
    bottom: -16px;
    width: 2px;
    background: #2a2a2a;
  }
`;

const TimelineIcon = styled.div<{ type: string }>`
  position: absolute;
  left: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: ${({ type }) => {
    switch (type) {
      case 'STATUS_CHANGE':
        return '#3b82f6';
      case 'NOTE':
        return '#8b5cf6';
      case 'EMAIL':
        return '#22c55e';
      case 'CALL':
        return '#f59e0b';
      case 'MEETING':
        return '#ec4899';
      default:
        return '#6b7280';
    }
  }};
  color: #ffffff;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineText = styled.div`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 4px;
`;

const TimelineTime = styled.div`
  color: #6b7280;
  font-size: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: #ffffff;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background: #2a2a2a;
  color: #e0e0e0;

  &:hover {
    background: #374151;
  }
`;

interface DealDetailProps {
  deal: Deal;
  activities?: DealActivity[];
  onEdit?: () => void;
  onChangeStage?: () => void;
}

export const DealDetail = ({
  deal,
  activities = [],
  onEdit,
  onChangeStage,
}: DealDetailProps) => {
  const { t } = useLingui();

  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN') + ' ₫';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'STATUS_CHANGE':
        return '📊';
      case 'NOTE':
        return '📝';
      case 'EMAIL':
        return '✉️';
      case 'CALL':
        return '📞';
      case 'MEETING':
        return '🤝';
      default:
        return '📌';
    }
  };

  return (
    <Container>
      <MainContent>
        <Card>
          <DealHeader>
            <DealInfo>
              <DealTitle>{deal.customerName}</DealTitle>
              <DealSubtitle>Deal ID: {deal.id}</DealSubtitle>
            </DealInfo>
            <StageIndicator stage={deal.stage}>{deal.stage}</StageIndicator>
          </DealHeader>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>{t`Deal Value`}</InfoLabel>
              <InfoValue style={{ color: '#22c55e' }}>
                {formatCurrency(deal.dealValue)}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>
                {t`Commission`} ({deal.commissionRate}%)
              </InfoLabel>
              <InfoValue style={{ color: '#f59e0b' }}>
                {formatCurrency(deal.commission)}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>{t`Created Date`}</InfoLabel>
              <InfoValue>{formatDate(deal.createdAt)}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>{t`Last Updated`}</InfoLabel>
              <InfoValue>{formatDate(deal.updatedAt)}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>{t`Assigned Agent`}</InfoLabel>
              <InfoValue>{deal.assignedAgentName || t`Unassigned`}</InfoValue>
            </InfoItem>
          </InfoGrid>

          {deal.notes && (
            <div style={{ marginTop: '16px' }}>
              <InfoLabel
                style={{ display: 'block', marginBottom: '8px' }}
              >{t`Notes`}</InfoLabel>
              <div
                style={{
                  fontSize: '14px',
                  color: '#e0e0e0',
                  padding: '12px',
                  background: '#0d0d0d',
                  borderRadius: '8px',
                  border: '1px solid #2a2a2a',
                }}
              >
                {deal.notes}
              </div>
            </div>
          )}

          <ActionButtons>
            <PrimaryButton onClick={onEdit}>{t`Edit Deal`}</PrimaryButton>
            <SecondaryButton
              onClick={onChangeStage}
            >{t`Change Stage`}</SecondaryButton>
          </ActionButtons>
        </Card>

        <Card>
          <CardTitle>{t`Activity Timeline`}</CardTitle>
          <Timeline>
            {activities.length === 0 ? (
              <div
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  textAlign: 'center',
                }}
              >
                {t`No activities yet`}
              </div>
            ) : (
              activities.map((activity) => (
                <TimelineItem key={activity.id}>
                  <TimelineIcon type={activity.type}>
                    {getActivityIcon(activity.type)}
                  </TimelineIcon>
                  <TimelineContent>
                    <TimelineText>{activity.description}</TimelineText>
                    <TimelineTime>
                      {formatDateTime(activity.timestamp)}
                    </TimelineTime>
                  </TimelineContent>
                </TimelineItem>
              ))
            )}
          </Timeline>
        </Card>
      </MainContent>

      <Sidebar>
        <Card>
          <CardTitle>{t`Linked Property`}</CardTitle>
          <PropertyCard>
            <PropertyName>{deal.propertyName}</PropertyName>
            <PropertyMeta>
              {t`Property ID:`} {deal.propertyId}
            </PropertyMeta>
          </PropertyCard>
        </Card>

        <Card>
          <CardTitle>{t`Customer Information`}</CardTitle>
          <InfoItem>
            <InfoLabel>{t`Customer ID`}</InfoLabel>
            <InfoValue style={{ fontSize: '14px' }}>
              {deal.customerId}
            </InfoValue>
          </InfoItem>
        </Card>
      </Sidebar>
    </Container>
  );
};
