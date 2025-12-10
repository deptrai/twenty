import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';

const StyledModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(8)};
  width: 90%;
  max-width: 500px;
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0;
`;

const StyledCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.font.color.tertiary};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.font.color.primary};
  }
`;

const StyledCommissionInfo = styled.div`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const StyledInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: 14px;
`;

const StyledValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  font-weight: 500;
`;

const StyledFormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledFormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.font.color.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledSelect = styled.select`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  padding: ${({ theme }) => theme.spacing(3)};
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.primary};
  font-family: inherit;
  font-size: 14px;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing(3)};
  resize: vertical;
  width: 100%;
`;

const StyledWarning = styled.div`
  background: rgba(255, 193, 7, 0.1);
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 13px;
  color: ${({ theme }) => theme.font.color.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const StyledModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  justify-content: flex-end;
`;

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(6)}`};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
    background: #ef4444;
    color: white;
    border: none;

    &:hover {
      background: #dc2626;
    }
  `
      : `
    background: transparent;
    color: ${theme.font.color.secondary};
    border: 1px solid ${theme.border.color.medium};

    &:hover {
      background: ${theme.background.transparent.light};
    }
  `}
`;

interface CommissionRejectModalProps {
  isOpen: boolean;
  commission: {
    id: string;
    commissionId: string;
    agent: string;
    amount: number;
  } | null;
  onClose: () => void;
  onConfirm: (commissionId: string, reason: string, notes: string) => void;
}

export const CommissionRejectModal = ({
  isOpen,
  commission,
  onClose,
  onConfirm,
}: CommissionRejectModalProps) => {
  const { t } = useLingui();
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    if (commission && reason) {
      onConfirm(commission.id, reason, notes);
      setReason('');
      setNotes('');
      onClose();
    }
  };

  const handleClose = () => {
    setReason('');
    setNotes('');
    onClose();
  };

  if (!commission) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <StyledModalOverlay $isOpen={isOpen} onClick={handleClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>✗ {t`Reject Commission`}</StyledModalTitle>
          <StyledCloseButton onClick={handleClose}>×</StyledCloseButton>
        </StyledModalHeader>

        <StyledCommissionInfo>
          <StyledInfoRow>
            <StyledLabel>{t`Commission:`}</StyledLabel>
            <StyledValue>{commission.commissionId}</StyledValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledLabel>{t`Agent:`}</StyledLabel>
            <StyledValue>{commission.agent}</StyledValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledLabel>{t`Amount:`}</StyledLabel>
            <StyledValue>{formatCurrency(commission.amount)}</StyledValue>
          </StyledInfoRow>
        </StyledCommissionInfo>

        <StyledFormGroup>
          <StyledFormLabel>
            {t`Rejection Reason`} <span style={{ color: '#ef4444' }}>*</span>
          </StyledFormLabel>
          <StyledSelect
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">{t`Select reason...`}</option>
            <option value="Deal value incorrect">{t`Deal value incorrect`}</option>
            <option value="Commission rate mismatch">{t`Commission rate mismatch`}</option>
            <option value="Missing documentation">{t`Missing documentation`}</option>
            <option value="Other">{t`Other`}</option>
          </StyledSelect>
        </StyledFormGroup>

        <StyledFormGroup>
          <StyledFormLabel>{t`Additional Notes`}</StyledFormLabel>
          <StyledTextarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t`Please verify deal value and resubmit...`}
          />
        </StyledFormGroup>

        <StyledWarning>
          ⚠️ {t`Agent will be notified via email and in-app`}
        </StyledWarning>

        <StyledModalActions>
          <StyledButton onClick={handleClose}>{t`Cancel`}</StyledButton>
          <StyledButton
            $variant="primary"
            onClick={handleConfirm}
            disabled={!reason}
          >
            ✓ {t`Reject`}
          </StyledButton>
        </StyledModalActions>
      </StyledModal>
    </StyledModalOverlay>
  );
};
