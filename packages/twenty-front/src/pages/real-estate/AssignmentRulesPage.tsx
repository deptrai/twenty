import { AssignmentRulesConfig } from '@/real-estate/components/AssignmentRulesConfig';
import { mockAssignmentRules } from '@/real-estate/data/lead-distribution-mock';
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

export const AssignmentRulesPage = () => {
  const { t } = useLingui();

  const handleEditRule = (ruleId: string) => {
    alert(`Edit rule: ${ruleId}`);
  };

  const handleToggleRule = (ruleId: string) => {
    alert(`Toggle rule: ${ruleId}`);
  };

  const handleAddRule = () => {
    alert('Add new rule');
  };

  return (
    <PageContainer>
      <StyledHeader>
        <StyledTitle>{t`⚙️ Lead Assignment Rules`}</StyledTitle>
        <StyledSubtitle>
          {t`Configure automatic lead distribution rules and priorities`}
        </StyledSubtitle>
      </StyledHeader>
      <StyledContent>
        <AssignmentRulesConfig
          rules={mockAssignmentRules}
          onEditRule={handleEditRule}
          onToggleRule={handleToggleRule}
          onAddRule={handleAddRule}
        />
      </StyledContent>
    </PageContainer>
  );
};
