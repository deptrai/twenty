import { CommissionApprovalQueue } from '@/real-estate/components/CommissionApprovalQueue';
import { mockCommissions } from '@/real-estate/data/sales-tools-mock';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';

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

export const CommissionApprovalPage = () => {
  const { t } = useLingui();

  const [commissions, setCommissions] = useState(
    mockCommissions.map((c) => ({
      id: c.id,
      commissionId: `C-2025-${c.id.split('-')[1].padStart(4, '0')}`,
      deal: c.dealName || 'Unknown Deal',
      agent: c.agentName || 'Unknown Agent',
      dealValue: c.amount / (c.rate / 100),
      rate: c.rate,
      amount: c.amount,
      status: c.status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID',
      createdAt: new Date(c.requestedAt).toLocaleDateString('vi-VN'),
    })),
  );

  const handleApprove = (id: string) => {
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: 'APPROVED' as const } : c,
      ),
    );
    alert(`Commission ${id} approved successfully!`);
  };

  const handleReject = (id: string, reason: string, notes: string) => {
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: 'REJECTED' as const } : c,
      ),
    );
    alert(`Commission ${id} rejected.\nReason: ${reason}\nNotes: ${notes}`);
  };

  const handleExport = () => {
    const csvHeader =
      'Commission ID,Deal,Agent,Deal Value,Rate,Amount,Status,Created\n';
    const csvRows = commissions
      .map(
        (c) =>
          `${c.commissionId},${c.deal},${c.agent},${c.dealValue},${c.rate}%,${c.amount},${c.status},${c.createdAt}`,
      )
      .join('\n');
    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `commissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <PageContainer>
      <StyledHeader>
        <StyledTitle>{t`💰 Commission Approval Queue`}</StyledTitle>
        <StyledSubtitle>
          {t`Finance Team - Review and approve commissions`}
        </StyledSubtitle>
      </StyledHeader>
      <StyledContent>
        <CommissionApprovalQueue
          commissions={commissions}
          onApprove={handleApprove}
          onReject={handleReject}
          onExport={handleExport}
        />
      </StyledContent>
    </PageContainer>
  );
};
