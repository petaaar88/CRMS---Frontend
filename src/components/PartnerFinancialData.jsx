import {useContext, useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import {formatCurrency} from "../utils/currencyUtils";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {ThemeContext} from "../contexts/ThemeContext";
import {CircularProgress} from "@mui/material";

const PartnerFinancialData = ({partnerId}) => {
    const {fetchData, fetchedData} = useFetch();
    const {accessToken} = useAuth();
    const {theme} = useContext(ThemeContext);

    useEffect(() => {

        if (partnerId)
            fetchData(
                import.meta.env.VITE_API_URL + `/api/partners/${partnerId}/financial-data`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
    }, [partnerId]);

    if (!fetchedData) {
        return (
            <div className="flex items-center justify-center h-64">
                <CircularProgress size={60}
                                  sx={{
                                      color:
                                          theme === "dark"
                                              ? "var(--color-menu-button-dark)"
                                              : "var(--color-button-light-green)",
                                  }}/>
            </div>
        );
    }

    // Empty data state
    if (fetchedData.financialData.length == 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-200 text-lg">No financial data available</p>
            </div>
        );
    }

    const chartData = fetchedData?.financialData.map(item => ({
        month: item.month.substring(5),
        monthLabel: `${item.month.substring(5)}/${item.month.substring(0, 4)}`,
        revenue: item.revenue,
        expenses: item.expenses,
        profit: item.profit
    }));

    const totalData = fetchedData?.financialData.reduce(
        (acc, curr) => ({
            revenue: acc.revenue + curr.revenue,
            expenses: acc.expenses + curr.expenses,
            profit: acc.profit + curr.profit
        }),
        {revenue: 0, expenses: 0, profit: 0}
    );

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-forest-green p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 dark:text-white mb-2">
                        Month: {label}
                    </p>
                    {payload.map((pld, index) => (
                        <p key={index} className="text-sm" style={{color: pld.color}}>
                            {pld.name}: {formatCurrency(pld.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const calculateGrowthPercentage = (type) => {

        if (fetchedData.financialData.length < 2) return 0;

        const current = fetchedData.financialData[fetchedData.financialData.length - 1][type];
        const previous = fetchedData.financialData[fetchedData.financialData.length - 2][type];

        if (previous === 0) return 0;
        return ((current - previous) / previous * 100).toFixed(1);
    };

    const revenueGrowth = calculateGrowthPercentage("revenue");
    const expensesGrowth = calculateGrowthPercentage("expenses");
    const profitGrowth = calculateGrowthPercentage("profit");

    return (
        <div className="my-4">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                <div
                    className="bg-white dark:bg-forest-green rounded-xl shadow-lg p-6 border-l-4 border-green-500 w-full">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">
                        Total Revenue
                    </h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {formatCurrency(totalData?.revenue || 0)}
                    </p>
                    <span className={`inline-block text-sm px-2 py-1 rounded-full mt-2 ${
                        revenueGrowth >= 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}%
                    </span>
                </div>

                <div
                    className="bg-white dark:bg-forest-green rounded-xl shadow-lg p-6 border-l-4 border-red-500 w-full">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                        Total Expenses
                    </h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {formatCurrency(totalData?.expenses || 0)}
                    </p>
                    <span className={`inline-block text-sm px-2 py-1 rounded-full mt-2 ${
                        expensesGrowth <= 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {expensesGrowth >= 0 ? '+' : ''}{expensesGrowth}%
                    </span>
                </div>

                <div
                    className="bg-white dark:bg-forest-green rounded-xl shadow-lg p-6 border-l-4 border-blue-500 w-full">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                        Total Profit
                    </h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {formatCurrency(totalData?.profit || 0)}
                    </p>
                    <span className={`inline-block text-sm px-2 py-1 rounded-full mt-2 ${
                        profitGrowth >= 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {profitGrowth >= 0 ? '+' : ''}{profitGrowth}%
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="bg-white dark:bg-forest-green rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Trend of Financial Indicators
                    </h2>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                                <XAxis
                                    dataKey="monthLabel"
                                    tick={{fontSize: 12}}
                                    stroke={theme === "dark" ? "#ffffff" : "#6b7280"}
                                />
                                <YAxis
                                    tick={{fontSize: 12}}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                    stroke={theme === "dark" ? "#ffffff" : "#6b7280"}
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend/>
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    name="Revenue"
                                    dot={{r: 6, fill: '#10b981'}}
                                    activeDot={{r: 8}}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    name="Expenses"
                                    dot={{r: 6, fill: '#ef4444'}}
                                    activeDot={{r: 8}}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    name="Profit"
                                    dot={{r: 6, fill: '#3b82f6'}}
                                    activeDot={{r: 8}}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-forest-green rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Monthly Comparison
                    </h2>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <BarChart data={chartData} barCategoryGap="20%">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                                <XAxis
                                    dataKey="monthLabel"
                                    tick={{fontSize: 12}}
                                    stroke={theme === "dark" ? "#ffffff" : "#6b7280"}
                                />
                                <YAxis
                                    tick={{fontSize: 12}}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                    stroke={theme === "dark" ? "#ffffff" : "#6b7280"}
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend/>
                                <Bar dataKey="revenue" fill="#10b981" name="Revenue" radius={[4, 4, 0, 0]}/>
                                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]}/>
                                <Bar dataKey="profit" fill="#3b82f6" name="Profit" radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-forest-green rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Detailed Data
                    </h2>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                        {fetchedData?.financialData.slice(-6).reverse().map((item, index) => (
                            <div key={index}
                                 className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                                    Month: {item.month.substring(5)}/{item.month.substring(0, 4)}
                                </h3>
                                <div className="flex flex-col sm:flex-row  justify-between sm:px-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-white mb-1">
                                            Revenue
                                        </p>
                                        <p className="text-lg font-bold text-green-600">
                                            {formatCurrency(item.revenue)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-white mb-1">
                                            Expenses
                                        </p>
                                        <p className="text-lg font-bold text-red-600">
                                            {formatCurrency(item.expenses)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-white mb-1">
                                            Profit
                                        </p>
                                        <p className="text-lg font-bold text-blue-600">
                                            {formatCurrency(item.profit)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnerFinancialData