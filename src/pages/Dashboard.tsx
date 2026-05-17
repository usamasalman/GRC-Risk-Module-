import { useData } from '@/store/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRiskScore, getRiskLevel, getRiskColor } from '@/lib/risk-utils';
import { ShieldAlert, CheckCircle, Activity, AlertTriangle, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { risks, treatmentPlans, riskControlMappings, controls } = useData();

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
      level: getRiskLevel(residualScore)
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

  const formatPieData = (counts: Record<string, number>) => [
    { name: 'Very High', value: counts['Very High'] },
    { name: 'High', value: counts['High'] },
    { name: 'Moderate', value: counts['Moderate'] },
    { name: 'Low', value: counts['Low'] },
  ];

  const inherentPieData = formatPieData(inherentCounts);
  const residualPieData = formatPieData(residualCounts);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-md shadow-sm p-2 text-sm">
          <span className="font-semibold">{payload[0].name}</span>: {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Risk Count Widget */}
        <Card className="flex flex-col border border-slate-200">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-sm font-semibold flex justify-between items-center text-slate-600">
              Total Risk Count
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center pt-6">
            <span className="text-6xl font-light text-slate-800">{risks.length}</span>
          </CardContent>
        </Card>

        {/* Inherent Risk Widget */}
        <Card className="flex flex-col border border-slate-200">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-sm font-semibold text-slate-600">Inherent Risk</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex justify-center">
            <div className="h-40 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inherentPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {inherentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                 <span className="text-xs text-slate-500 font-medium">Total</span>
                 <span className="text-lg font-bold">{risks.length}</span>
               </div>
            </div>
          </CardContent>
           <div className="flex justify-center gap-3 pb-4 text-[10px] text-slate-600">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>Very High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>Medium</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span>Low</span>
           </div>
        </Card>

        {/* Residual Risk Widget */}
        <Card className="flex flex-col border border-slate-200">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-sm font-semibold text-slate-600">Residual Risk</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex justify-center">
            <div className="h-40 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={residualPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {residualPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                 <span className="text-xs text-slate-500 font-medium">Total</span>
                 <span className="text-lg font-bold">{risks.length}</span>
               </div>
            </div>
          </CardContent>
           <div className="flex justify-center gap-3 pb-4 text-[10px] text-slate-600">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>Very High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>Medium</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span>Low</span>
           </div>
        </Card>

         {/* Post Treatment Risk Widget */}
         <Card className="flex flex-col border border-slate-200">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-sm font-semibold text-slate-600">Post Treatment Risk</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex justify-center">
            <div className="h-40 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={residualPieData} /* Approximation for display */
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {residualPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                 <span className="text-xs text-slate-500 font-medium">Total</span>
                 <span className="text-lg font-bold">{risks.length}</span>
               </div>
            </div>
          </CardContent>
           <div className="flex justify-center gap-3 pb-4 text-[10px] text-slate-600">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>Very High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>Medium</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span>Low</span>
           </div>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-sm font-semibold text-slate-600">Inherent Department Stats</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'IT Infrastructure', 'High': 2, 'Medium': 1 }]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#F1F5F9' }} />
                  <Bar dataKey="High" fill="#dc2626" stackId="a" />
                  <Bar dataKey="Medium" fill="#facc15" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-sm font-semibold text-slate-600">Top Enterprise Risks</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {inherentRisks
                .sort((a, b) => getRiskScore(b.likelihood, b.impact) - getRiskScore(a.likelihood, a.impact))
                .slice(0, 4)
                .map(risk => {
                  const score = getRiskScore(risk.likelihood, risk.impact);
                  const textColor = getRiskColor(risk.level as any);
                  return (
                    <div key={risk.id} className="flex items-center justify-between p-3 rounded-md border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full shrink-0", textColor)} />
                        <div>
                          <h4 className="text-sm font-medium text-slate-800">{risk.title}</h4>
                          <div className="text-xs text-slate-500 mt-0.5">{risk.code}</div>
                        </div>
                      </div>
                      <Link to={`/risks/${risk.id}`} className="text-indigo-600 hover:text-indigo-800 p-2">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
