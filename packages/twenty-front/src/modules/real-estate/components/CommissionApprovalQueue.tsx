import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { CommissionRejectModal } from './CommissionRejectModal';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
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

const StyledCardSubtitle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.font.color.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StyledCardValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 28px;
  font-weight: 600;
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

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? '#3b82f6' : theme.background.secondary};
  color: ${({ $variant }) => ($variant === 'primary' ? 'white' : 'inherit')};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledCommissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledCommissionCard = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledCardHeaderLeft = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const StyledCommissionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledStatus = styled.span<{ $status: string }>`
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 12px;
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};

  ${({ $status }) => {
    switch ($status) {
      case 'PENDING':
        return 'background: rgba(234, 179, 8, 0.1); color: #eab308;';
      case 'APPROVED':
        return 'background: rgba(59, 130, 246, 0.1); color: #3b82f6;';
      case 'PAID':
        return 'background: rgba(34, 197, 94, 0.1); color: #22c55e;';
      default:
        return 'background: rgba(156, 163, 175, 0.1); color: #9ca3af;';
    }
  }}
`;

const StyledCommissionDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(6)}`};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledDetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledDetailLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 12px;
`;

const StyledDetailValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  font-weight: 500;
`;

const StyledActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledActionButton = styled.button<{
  $variant?: 'approve' | 'reject' | 'details';
}>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) => {
    switch ($variant) {
      case 'approve':
        return `
          background: #22c55e;
          color: white;
          border: none;

          &:hover {
            background: #16a34a;
          }
        `;
      case 'reject':
        return `
          background: #ef4444;
          color: white;
          border: none;

          &:hover {
            background: #dc2626;
          }
        `;
      default:
        return `
          background: transparent;
          color: inherit;
          border: 1px solid;

          &:hover {
            opacity: 0.8;
          }
        `;
    }
  }}
`;

const StyledBulkActions = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

interface Commission {
  id: string;
  commissionId: string;
  deal: string;
  agent: string;
  dealValue: number;
  rate: number;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  createdAt: string;
}

interface CommissionApprovalQueueProps {
  commissions: Commission[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string, notes: string) => void;
  onExport: () => void;
}

export const CommissionApprovalQueue = ({
  commissions,
  onApprove,
  onReject,
  onExport,
}: CommissionApprovalQueueProps) => {
  const { t } = useLingui();
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rejectModal, setRejectModal] = useState<{
    isOpen: boolean;
    commission: Commission | null;
  }>({ isOpen: false, commission: null });

  const filteredCommissions = commissions.filter(
    (c) => c.status === statusFilter,
  );

  const stats = {
    pending: {
      count: commissions.filter((c) => c.status === 'PENDING').length,
      total: commissions
        .filter((c) => c.status === 'PENDING')
        .reduce((sum, c) => sum + c.amount, 0),
    },
    approved: {
      count: commissions.filter((c) => c.status === 'APPROVED').length,
      total: commissions
        .filter((c) => c.status === 'APPROVED')
        .reduce((sum, c) => sum + c.amount, 0),
    },
    paid: {
      count: commissions.filter((c) => c.status === 'PAID').length,
      total: commissions
        .filter((c) => c.status === 'PAID')
        .reduce((sum, c) => sum + c.amount, 0),
    },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredCommissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCommissions.map((c) => c.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleReject = (commission: Commission) => {
    setRejectModal({ isOpen: true, commission });
  };

  return (
    <StyledContainer>
      <StyledSummaryGrid>
        <StyledSummaryCard $color="#eab308">
          <StyledCardTitle>
            ⏳ {t`Pending`} ({stats.pending.count})
          </StyledCardTitle>
          <StyledCardSubtitle>{t`Requires Action`}</StyledCardSubtitle>
          <StyledCardValue>
            {formatCurrency(stats.pending.total)}
          </StyledCardValue>
        </StyledSummaryCard>

        <StyledSummaryCard $color="#3b82f6">
          <StyledCardTitle>
            ✅ {t`Approved`} ({stats.approved.count})
          </StyledCardTitle>
          <StyledCardSubtitle>{t`Awaiting Payment`}</StyledCardSubtitle>
          <StyledCardValue>
            {formatCurrency(stats.approved.total)}
          </StyledCardValue>
        </StyledSummaryCard>

        <StyledSummaryCard $color="#22c55e">
          <StyledCardTitle>
            💵 {t`Paid`} ({stats.paid.count})
          </StyledCardTitle>
          <StyledCardSubtitle>{t`Completed This Month`}</StyledCardSubtitle>
          <StyledCardValue>{formatCurrency(stats.paid.total)}</StyledCardValue>
        </StyledSummaryCard>
      </StyledSummaryGrid>

      <StyledFilters>
        <StyledSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="PENDING">{t`Pending`}</option>
          <option value="APPROVED">{t`Approved`}</option>
          <option value="PAID">{t`Paid`}</option>
        </StyledSelect>
        <StyledButton onClick={onExport}>⬇ {t`Export CSV`}</StyledButton>
      </StyledFilters>

      <StyledCommissionList>
        {filteredCommissions.map((commission) => (
          <StyledCommissionCard key={commission.id}>
            <StyledCardHeader>
              <StyledCardHeaderLeft>
                <StyledCheckbox
                  type="checkbox"
                  checked={selectedIds.includes(commission.id)}
                  onChange={() => handleSelect(commission.id)}
                />
                <div>
                  <StyledCommissionTitle>
                    {commission.commissionId}
                  </StyledCommissionTitle>
                </div>
              </StyledCardHeaderLeft>
              <StyledStatus $status={commission.status}>
                {commission.status}
              </StyledStatus>
            </StyledCardHeader>

            <StyledCommissionDetails>
              <StyledDetailRow>
                <StyledDetailLabel>{t`Deal`}</StyledDetailLabel>
                <StyledDetailValue>{commission.deal}</StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailLabel>{t`Agent`}</StyledDetailLabel>
                <StyledDetailValue>{commission.agent}</StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailLabel>{t`Deal Value`}</StyledDetailLabel>
                <StyledDetailValue>
                  {formatCurrency(commission.dealValue)}
                </StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailLabel>{t`Rate`}</StyledDetailLabel>
                <StyledDetailValue>{commission.rate}%</StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailLabel>{t`Commission`}</StyledDetailLabel>
                <StyledDetailValue>
                  {formatCurrency(commission.amount)}
                </StyledDetailValue>
              </StyledDetailRow>
              <StyledDetailRow>
                <StyledDetailLabel>{t`Created`}</StyledDetailLabel>
                <StyledDetailValue>{commission.createdAt}</StyledDetailValue>
              </StyledDetailRow>
            </StyledCommissionDetails>

            {commission.status === 'PENDING' && (
              <StyledActions>
                <StyledActionButton
                  $variant="approve"
                  onClick={() => onApprove(commission.id)}
                >
                  ✓ {t`Approve`}
                </StyledActionButton>
                <StyledActionButton
                  $variant="reject"
                  onClick={() => handleReject(commission)}
                >
                  ✕ {t`Reject`}
                </StyledActionButton>
                <StyledActionButton $variant="details">
                  {t`Details`}
                </StyledActionButton>
              </StyledActions>
            )}
          </StyledCommissionCard>
        ))}
      </StyledCommissionList>

      {filteredCommissions.length > 0 && (
        <StyledBulkActions>
          <StyledButton onClick={handleSelectAll}>
            {selectedIds.length === filteredCommissions.length
              ? t`Deselect All`
              : t`Select All`}
          </StyledButton>
          <span>
            {selectedIds.length} {t`selected`}
          </span>
          {selectedIds.length > 0 && statusFilter === 'PENDING' && (
            <StyledButton $variant="primary">
              {t`Approve Selected`} ({selectedIds.length})
            </StyledButton>
          )}
        </StyledBulkActions>
      )}

      <CommissionRejectModal
        isOpen={rejectModal.isOpen}
        commission={
          rejectModal.commission
            ? {
                id: rejectModal.commission.id,
                commissionId: rejectModal.commission.commissionId,
                agent: rejectModal.commission.agent,
                amount: rejectModal.commission.amount,
              }
            : null
        }
        onClose={() => setRejectModal({ isOpen: false, commission: null })}
        onConfirm={onReject}
      />
    </StyledContainer>
  );
};
