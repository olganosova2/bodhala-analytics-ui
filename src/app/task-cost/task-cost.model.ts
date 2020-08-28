export const AG_GRID_NAME = 'TaskCost';
export interface ITaskCost {
  column_name: string;
  line_item_task_code: string;
  line_item_task_group: string;
  line_item_task_description: string;
  line_item_group_description: string;
  total_billed: number;
  total_hours: number;
  avg_matter_cost: number;
  total_matters: number;
  total_matters_group: number;
  total_matters_column: number;
  line_item_task_code_formatted?: string;
}

