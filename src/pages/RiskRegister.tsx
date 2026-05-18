import { useData } from '@/store/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { getRiskScore, getRiskLevel } from '@/lib/risk-utils';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function RiskRegister() {
  const { risks, riskControlMappings, controls, treatmentPlans } = useData();
  const navigate = useNavigate();

  const getRiskLevelsCount = (riskList: { level: string }[]) => {
    return {
      'Very High': riskList.filter(r => r.level === 'Very High').length,
      'High': riskList.filter(r => r.level === 'High').length,
      'Moderate': riskList.filter(r => r.level === 'Moderate').length,
      'Low': riskList.filter(r => r.level === 'Low').length,
    };
  };

  const inherentRisks = risks.map(r => ({
    ...r,
    level: getRiskLevel(getRiskScore(r.likelihood, r.impact))
  }));

  const residualRisks = risks.map(r => {
    const score = getRiskScore(r.likelihood, r.impact);
    const mappedControls = riskControlMappings.filter(m => m.riskId === r.id);
    const avgEffectiveness = mappedControls.length > 0 
      ? mappedControls.reduce((sum, mc) => {
          const control = controls.find(c => c.id === mc.controlId);
          return sum + ((control ? control.designEffectiveness + control.operatingEffectiveness : 0) / 2) * mc.weight;
        }, 0) / mappedControls.reduce((sum, mc) => sum + mc.weight, 0)
      : 0;
    const residualScore = Math.max(1, Math.round(score * (1 - avgEffectiveness)));
    return {
      ...r,
      level: getRiskLevel(residualScore),
      residualScore
    };
  });

  const inherentCounts = getRiskLevelsCount(inherentRisks);
  const residualCounts = getRiskLevelsCount(residualRisks);

  const COLORS = {
    'Very High': '#dc2626',
    'High': '#ea580c',
    'Moderate': '#facc15',
    'Low': '#16a34a',
  };

  const inherentPieData = [
    { name: 'Very High', value: inherentCounts['Very High'] },
    { name: 'High', value: inherentCounts['High'] },
    { name: 'Moderate', value: inherentCounts['Moderate'] },
    { name: 'Low', value: inherentCounts['Low'] },
  ];

  const residualPieData = [
    { name: 'Very High', value: residualCounts['Very High'] },
    { name: 'High', value: residualCounts['High'] },
    { name: 'Moderate', value: residualCounts['Moderate'] },
    { name: 'Low', value: residualCounts['Low'] },
  ];

  const avgTreatmentProgress = treatmentPlans.length > 0 
    ? Math.round(treatmentPlans.reduce((sum, p) => sum + p.progress, 0) / treatmentPlans.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          Risk Register <Filter className="w-5 h-5 text-slate-400" />
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="bg-[#1e293b] flex-1 sm:flex-none" onClick={() => navigate('/risks/new')}>
            <Plus className="mr-2 h-4 w-4" /> Create Risk
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Overview Stats */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
          <div className="text-center w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0">
            <p className="text-sm font-medium text-slate-500 mb-2">Total Risk</p>
            <p className="text-5xl font-light">{risks.length}</p>
          </div>
          <div className="text-center w-full sm:w-1/2">
            <p className="text-sm font-medium text-slate-500 mb-2">Treatment Progress</p>
            <p className="text-5xl font-light">{avgTreatmentProgress}%</p>
          </div>
        </Card>

        {/* Risk by Stage Placeholder */}
        <Card className="p-4 flex flex-col justify-center min-h-[140px]">
           <p className="text-xs font-semibold text-slate-500 mb-3">Risk by Stage</p>
           <div className="space-y-2">
              <div className="flex items-center text-xs gap-2"><div className="flex-1 bg-slate-100 h-4 rounded overflow-hidden"><div className="bg-red-500 w-1/3 h-full"></div></div><span className="w-12">Risk</span></div>
              <div className="flex items-center text-xs gap-2"><div className="flex-1 bg-slate-100 h-4 rounded overflow-hidden"><div className="bg-orange-500 w-2/3 h-full"></div></div><span className="w-12">Control</span></div>
           </div>
        </Card>

        {/* Inherent Risk Pie */}
        <Card className="flex flex-col items-center p-2 relative min-h-[140px]">
          <div className="absolute top-2 left-3 text-xs font-semibold text-slate-500">Inherent Risk</div>
          <div className="w-24 h-24 relative pt-4 mx-auto">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={inherentPieData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value">
                    {inherentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center pointer-events-none pb-1 text-center">
                 <span className="text-[10px] text-slate-500 leading-none">Total</span>
                 <span className="text-sm font-bold leading-none">{risks.length}</span>
               </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 px-2 pb-2 text-[10px] text-slate-600 mt-2">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span>Low</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>Medium</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>Very High</span>
           </div>
        </Card>

        {/* Residual Risk Pie */}
        <Card className="flex flex-col items-center p-2 relative min-h-[140px]">
           <div className="absolute top-2 left-3 text-xs font-semibold text-slate-500">Residual Risk</div>
          <div className="w-24 h-24 relative pt-4 mx-auto">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={residualPieData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value">
                    {residualPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center pointer-events-none pb-1 text-center">
                 <span className="text-[10px] text-slate-500 leading-none">Total</span>
                 <span className="text-sm font-bold leading-none">{risks.length}</span>
               </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 px-2 pb-2 text-[10px] text-slate-600 mt-2">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span>Low</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>Medium</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>Very High</span>
           </div>
        </Card>
      </div>

      <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px]">Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Inherent Rating</TableHead>
              <TableHead>Residual Rating</TableHead>
              <TableHead>Treatment Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residualRisks.map((risk) => {
              const score = getRiskScore(risk.likelihood, risk.impact);
              const level = getRiskLevel(score);
              const treatment = treatmentPlans.find(t => t.riskId === risk.id);
              return (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium text-indigo-600 text-xs">{risk.code}</TableCell>
                  <TableCell className="text-xs">{risk.title}</TableCell>
                  <TableCell className="text-xs text-slate-500">ABC Limited</TableCell>
                  <TableCell className="text-xs text-slate-500">Corporate</TableCell>
                  <TableCell>
                     <Badge variant="secondary" className="text-[10px] bg-slate-100 text-purple-700 hover:bg-slate-100">
                        {risk.status === 'Open' ? 'Monitoring' : 'Control'}
                     </Badge>
                  </TableCell>
                  <TableCell>
                     <span className="flex items-center text-xs text-slate-700">
                        <span className={cn("w-2 h-2 rounded-full mr-2", 
                           level === 'Low' ? 'bg-green-500' : 
                           level === 'Moderate' ? 'bg-yellow-400' : 
                           level === 'High' ? 'bg-orange-500' : 'bg-red-600')}></span>
                        {level}
                     </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center text-xs text-slate-700">
                        <span className={cn("w-2 h-2 rounded-full mr-2", 
                           risk.level === 'Low' ? 'bg-green-500' : 
                           risk.level === 'Moderate' ? 'bg-yellow-400' : 
                           risk.level === 'High' ? 'bg-orange-500' : 'bg-red-600')}></span>
                        {risk.level}
                     </span>
                  </TableCell>
                  <TableCell>
                     <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-1.5" style={{ width: `${treatment ? treatment.progress : 0}%` }}></div>
                     </div>
                     {/* <span className="text-[10px] text-slate-500 mt-1 block">{treatment ? treatment.progress : 0}%</span> */}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/risks/${risk.id}`} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "h-8 w-8 p-0")}>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
