import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import type { Commission, CommissionStatus } from '../types/sales-tools';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FiltersBar = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #2a2a2a;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: #a0a0a0;
  font-weight: 500;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ active }) => (active ? '#3b82f6' : '#2a2a2a')};
  background: ${({ active }) => (active ? '#1e40af' : '#0d0d0d')};
  color: ${({ active }) => (active ? '#ffffff' : '#e0e0e0')};

  &:hover {
    border-color: #3b82f6;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #2a2a2a;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 8px;
`;

const StatValue = styled.div<{ color?: string }>`
  color: ${({ color }) => color || '#ffffff'};
  font-size: 24px;
  font-weight: 600;
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 8px;
  width: 100%;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;

  &:first-of-type {
    border-radius: 8px 0 0 8px;
  }

  &:last-of-type {
    border-radius: 0 8px 8px 0;
  }
`;

const Td = styled.td`
  padding: 16px;
  background: #1a1a1a;
  border-top: 1px solid #2a2a2a;
  border-bottom: 1px solid #2a2a2a;
  color: #ffffff;
  font-size: 14px;

  &:first-of-type {
    border-left: 1px solid #2a2a2a;
    border-radius: 8px 0 0 8px;
  }

  &:last-of-type {
    border-right: 1px solid #2a2a2a;
    border-radius: 0 8px 8px 0;
  }
`;

const StatusBadge = styled.span<{ status: CommissionStatus }>`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ status }) => {
    switch (status) {
      case 'PAID':
        return '#15803d';
      case 'APPROVED':
        return '#1e40af';
      case 'PENDING':
        return '#b45309';
      case 'REJECTED':
        return '#991b1b';
      default:
        return '#374151';
    }
  }};
  color: #ffffff;
`;

const EmptyState = styled.div`
  color: #6b7280;
  font-size: 14px;
  padding: 64px 24px;
  text-align: center;
`;

interface CommissionsListProps {
  commissions: Commission[];
}

export const CommissionsList = ({ commissions }: CommissionsListProps) => {
  const { t } = useLingui();
  const [selectedStatus, setSelectedStatus] = useState<
    CommissionStatus | 'ALL'
  >('ALL');

  const filteredCommissions = commissions.filter(
    (c) => selectedStatus === 'ALL' || c.status === selectedStatus,
  );

  const formatCurrency = (value: number) => {
    return (value / 1000000).toFixed(0) + 'M VND';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateTotal = (status: CommissionStatus | 'ALL') => {
    const filtered =
      status === 'ALL'
        ? commissions
        : commissions.filter((c) => c.status === status);
    return filtered.reduce((sum, c) => sum + c.amount, 0);
  };

  const getStatusLabel = (status: CommissionStatus) => {
    switch (status) {
      case 'PAID':
        return t`Paid`;
      case 'APPROVED':
        return t`Approved`;
      case 'PENDING':
        return t`Pending`;
      case 'REJECTED':
        return t`Rejected`;
      default:
        return status;
    }
  };

  return (
    <Container>
      <StatsRow>
        <StatCard>
          <StatLabel>{t`Total Commissions`}</StatLabel>
          <StatValue>{formatCurrency(calculateTotal('ALL'))}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>{t`Pending`}</StatLabel>
          <StatValue color="#f59e0b">
            {formatCurrency(calculateTotal('PENDING'))}
          </StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>{t`Approved`}</StatLabel>
          <StatValue color="#3b82f6">
            {formatCurrency(calculateTotal('APPROVED'))}
          </StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>{t`Paid`}</StatLabel>
          <StatValue color="#22c55e">
            {formatCurrency(calculateTotal('PAID'))}
          </StatValue>
        </StatCard>
      </StatsRow>

      <FiltersBar>
        <FilterLabel>{t`Filter by status:`}</FilterLabel>
        <FilterButton
          active={selectedStatus === 'ALL'}
          onClick={() => setSelectedStatus('ALL')}
        >
          {t`All`} ({commissions.length})
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'PENDING'}
          onClick={() => setSelectedStatus('PENDING')}
        >
          {t`Pending`} (
          {commissions.filter((c) => c.status === 'PENDING').length})
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'APPROVED'}
          onClick={() => setSelectedStatus('APPROVED')}
        >
          {t`Approved`} (
          {commissions.filter((c) => c.status === 'APPROVED').length})
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'PAID'}
          onClick={() => setSelectedStatus('PAID')}
        >
          {t`Paid`} ({commissions.filter((c) => c.status === 'PAID').length})
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'REJECTED'}
          onClick={() => setSelectedStatus('REJECTED')}
        >
          {t`Rejected`} (
          {commissions.filter((c) => c.status === 'REJECTED').length})
        </FilterButton>
      </FiltersBar>

      {filteredCommissions.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>{t`Deal`}</Th>
              <Th>{t`Property`}</Th>
              <Th>{t`Amount`}</Th>
              <Th>{t`Status`}</Th>
              <Th>{t`Requested`}</Th>
              <Th>{t`Updated`}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredCommissions.map((commission) => (
              <tr key={commission.id}>
                <Td>{commission.dealName || commission.dealId}</Td>
                <Td>{commission.propertyName || commission.propertyId}</Td>
                <Td style={{ fontWeight: 600, color: '#22c55e' }}>
                  {formatCurrency(commission.amount)}
                </Td>
                <Td>
                  <StatusBadge status={commission.status}>
                    {getStatusLabel(commission.status)}
                  </StatusBadge>
                </Td>
                <Td style={{ color: '#a0a0a0' }}>
                  {formatDate(commission.requestedAt)}
                </Td>
                <Td style={{ color: '#a0a0a0' }}>
                  {formatDate(
                    commission.paidAt ||
                      commission.approvedAt ||
                      commission.rejectedAt ||
                      commission.requestedAt,
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyState>
          {t`No commissions found with status:`}{' '}
          <strong>{selectedStatus}</strong>
        </EmptyState>
      )}
    </Container>
  );
};
