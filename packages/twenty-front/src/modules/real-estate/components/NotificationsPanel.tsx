import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import type { Notification } from '../data/lead-distribution-mock';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0;
`;

const StyledMarkAllButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 13px;
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};

  &:hover {
    color: ${({ theme }) => theme.font.color.primary};
  }
`;

const StyledNotificationCard = styled.div<{ $read: boolean }>`
  background: ${({ theme, $read }) =>
    $read ? theme.background.transparent.light : theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-left: 4px solid
    ${({ theme, $read }) => ($read ? theme.border.color.medium : '#3b82f6')};
`;

const StyledNotifHeader = styled.div`
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledNotifTitle = styled.div<{ $type: string }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  &::before {
    content: ${({ $type }) => {
      switch ($type) {
        case 'new_lead':
          return "'🆕'";
        case 'sla_warning':
          return "'⚠️'";
        case 'sla_breached':
          return "'🔴'";
        case 'commission_approved':
          return "'💵'";
        default:
          return "'🔔'";
      }
    }};
  }
`;

const StyledTimestamp = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 12px;
`;

const StyledNotifMessage = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.font.color.secondary};
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledActionButton = styled.button<{
  $variant?: 'primary' | 'secondary';
}>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
    background: #3b82f6;
    color: white;
    border: none;

    &:hover {
      background: #2563eb;
    }
  `
      : `
    background: transparent;
    color: ${theme.font.color.tertiary};
    border: 1px solid ${theme.border.color.medium};

    &:hover {
      background: ${theme.background.transparent.light};
    }
  `}
`;

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onAction?: (notification: Notification) => void;
}

export const NotificationsPanel = ({
  notifications,
  onMarkAllRead,
  onAction,
}: NotificationsPanelProps) => {
  const { t } = useLingui();

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>🔔 {t`Notifications`}</StyledTitle>
        <StyledMarkAllButton onClick={onMarkAllRead}>
          {t`Mark All Read`}
        </StyledMarkAllButton>
      </StyledHeader>

      {notifications.map((notif) => (
        <StyledNotificationCard key={notif.id} $read={notif.read}>
          <StyledNotifHeader>
            <StyledNotifTitle $type={notif.type}>
              {notif.title}
            </StyledNotifTitle>
            <StyledTimestamp>{notif.timestamp}</StyledTimestamp>
          </StyledNotifHeader>

          <StyledNotifMessage>{notif.message}</StyledNotifMessage>

          <StyledActions>
            {notif.actionLabel && (
              <StyledActionButton
                $variant="primary"
                onClick={() => onAction?.(notif)}
              >
                {notif.actionLabel}
              </StyledActionButton>
            )}
            {notif.type === 'new_lead' && (
              <StyledActionButton>{t`Call Now`}</StyledActionButton>
            )}
          </StyledActions>
        </StyledNotificationCard>
      ))}
    </StyledContainer>
  );
};
