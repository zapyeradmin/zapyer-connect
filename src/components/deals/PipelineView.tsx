
import React from 'react';
import StageColumn from './StageColumn';

interface Deal {
  id: number;
  title: string;
  value: number;
  company: string;
  stage: string;
  probability: number;
  owner: string;
  contact: string;
  closeDate: string;
}

interface Stage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
}

interface PipelineViewProps {
  dealsByStage: Stage[];
  pipelineStages: {
    id: string;
    name: string;
    color: string;
  }[];
}

const PipelineView: React.FC<PipelineViewProps> = ({ dealsByStage, pipelineStages }) => {
  return (
    <div className="bg-muted/30 rounded-lg p-6 overflow-auto hide-scrollbar">
      <div className="flex space-x-6">
        {dealsByStage.map(stage => (
          <StageColumn 
            key={stage.id} 
            stage={stage} 
            stageDeals={stage.deals} 
            pipelineStages={pipelineStages}
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineView;
