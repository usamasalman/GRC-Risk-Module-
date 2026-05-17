import { useData } from '@/store/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { getRiskScore } from '@/lib/risk-utils';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function TreatmentMonitor() {
  const { treatmentPlans, risks } = useData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Treatment Monitor</h2>
          <p className="text-sm text-slate-500">Track progress of risk mitigation and action plans.</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Associated Risk</TableHead>
              <TableHead>Strategy</TableHead>
              <TableHead>Target Deadline</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treatmentPlans.map((plan) => {
              const risk = risks.find(r => r.id === plan.riskId);
              return (
                <TableRow key={plan.id}>
                  <TableCell>
                    {risk ? (
                      <div>
                        <div className="font-medium">{risk.code}</div>
                        <div className="text-xs text-slate-500">{risk.title}</div>
                      </div>
                    ) : 'Unknown Risk'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={plan.strategy === 'Mitigate' ? 'default' : 'secondary'}>
                      {plan.strategy}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(plan.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 w-32">
                      <div className="flex justify-between text-xs">
                        <span>{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/risks/${plan.riskId}`} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
                      View Risk
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
