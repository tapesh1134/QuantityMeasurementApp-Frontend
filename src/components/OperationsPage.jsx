import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    setOperation,
    setCategory,
    updateQ1,
    updateQ2,
    setTargetUnit,
    performCalculation,
    swapUnits,
    clearAll,
    fetchHistory
} from '../store/quantitySlice';

import { OperationSelector } from '../components/OperationSelector';
import { CategorySelector } from '../components/CategorySelector';
import { Copy, RotateCcw, ArrowRightLeft } from 'lucide-react';

const OperationsPage = () => {
    const dispatch = useDispatch();

    const {
        operation,
        category,
        q1,
        q2,
        targetUnit,
        result,
        loading,
        units,
        history,
        historyLoading
    } = useSelector((state) => state.quantity);

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    const handleCalculate = async () => {
        if (isTemperatureArithmetic) return;

        const resultAction = await dispatch(performCalculation());
        if (performCalculation.fulfilled.match(resultAction)) {
            dispatch(fetchHistory());
        }
    };

    const formatHistoryItem = (item) => {
        const { operation, thisValue, thisUnit, thatValue, thatUnit, resultString, resultValue, resultUnit } = item;

        const val1 = `${thisValue} ${thisUnit}`;
        const val2 = `${thatValue} ${thatUnit}`;

        switch (operation) {
            case 'ADD':
                return `${val1} + ${val2} = ${resultValue} ${resultUnit}`;
            case 'SUBTRACT':
                return `${val1} - ${val2} = ${resultValue} ${resultUnit}`;
            case 'CONVERT':
                return `${val1} → ${resultString}`;
            case 'DIVIDE':
                return `${val1} / ${val2} = ${resultValue}`;
            case 'COMPARE':
                return `${val1} == ${val2} → ${resultString}`;
            default:
                return resultString || "Calculation";
        }
    };

    const isTemperatureArithmetic =
        category.id === "TEMPERATURE" &&
        ["ADD", "SUBTRACT", "DIVIDE"].includes(operation);

    const displayResult =
        isTemperatureArithmetic
            ? "Arithmetic operations are not supported for Temperature"
            : result?.operation === "COMPARE"
                ? result?.resultString
                : result?.resultValue != null
                    ? `${result.resultValue} ${result.resultUnit}`
                    : '';

    return (
        <div className="pt-20 pb-32 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Precision conversion and engineering math
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Step 1 */}
                        <section>
                            <OperationSelector
                                selected={operation}
                                onSelect={(id) => dispatch(setOperation(id))}
                                category={category}   // ✅ ADD THIS
                            />
                        </section>

                        {/* Step 2 */}
                        <section>
                            <CategorySelector
                                selected={category}
                                onSelect={(id) => dispatch(setCategory(id))}
                            />
                        </section>

                        {/* Step 3 */}
                        <section className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Q1 */}
                                <div>
                                    <label className="text-xs text-blue-400 font-bold">
                                        QUANTITY 1
                                    </label>

                                    <div className="flex bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-2">
                                        <input
                                            type="number"
                                            value={q1.value}
                                            onChange={(e) =>
                                                dispatch(updateQ1({ value: parseFloat(e.target.value) || 0 }))
                                            }
                                            className="bg-transparent p-3 w-full outline-none"
                                        />

                                        <select
                                            value={q1.unit}
                                            onChange={(e) =>
                                                dispatch(updateQ1({ unit: e.target.value }))
                                            }
                                            className="bg-gray-800 px-2 border-l border-gray-700"
                                        >
                                            {units[category]?.map((u) => (
                                                <option key={u}>{u}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Q2 */}
                                {operation !== 'CONVERSION' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <label className="text-xs text-blue-400 font-bold">
                                            QUANTITY 2
                                        </label>

                                        <div className="flex bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-2">
                                            <input
                                                type="number"
                                                value={q2.value}
                                                onChange={(e) =>
                                                    dispatch(updateQ2({ value: parseFloat(e.target.value) || 0 }))
                                                }
                                                className="bg-transparent p-3 w-full outline-none"
                                            />

                                            <select
                                                value={q2.unit}
                                                onChange={(e) =>
                                                    dispatch(updateQ2({ unit: e.target.value }))
                                                }
                                                className="bg-gray-800 px-2 border-l border-gray-700"
                                            >
                                                {units[category]?.map((u) => (
                                                    <option key={u}>{u}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Step 4 */}
                            {(operation === 'CONVERSION' ||
                                operation === 'ADDITION' ||
                                operation === 'SUBTRACTION') && (
                                    <div className="mt-6 flex items-center justify-between">

                                        <div className="w-60">
                                            <label className="text-xs text-purple-400 font-bold">
                                                TARGET UNIT
                                            </label>

                                            <select
                                                value={targetUnit}
                                                onChange={(e) =>
                                                    dispatch(setTargetUnit(e.target.value))
                                                }
                                                className="w-full mt-2 bg-gray-900 p-3 rounded-lg border border-gray-700"
                                            >
                                                <option value="">Default</option>
                                                {units[category]?.map((u) => (
                                                    <option key={u}>{u}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {operation === 'CONVERSION' && (
                                            <button
                                                onClick={() => dispatch(swapUnits())}
                                                className="p-3 rounded-full bg-gray-700 hover:bg-blue-600"
                                            >
                                                <ArrowRightLeft size={18} />
                                            </button>
                                        )}
                                    </div>
                                )}

                            {/* Actions */}
                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={handleCalculate}
                                    disabled={loading || isTemperatureArithmetic}
                                    className="flex-1 bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {isTemperatureArithmetic
                                        ? 'NOT SUPPORTED'
                                        : loading
                                            ? 'CALCULATING...'
                                            : 'CALCULATE'}
                                </button>

                                <button
                                    onClick={() => dispatch(clearAll())}
                                    className="px-5 bg-gray-700 rounded-xl hover:bg-red-700"
                                >
                                    <RotateCcw size={18} />
                                </button>
                            </div>
                        </section>

                        {/* RESULT */}
                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-blue-600/20 p-6 rounded-2xl border border-blue-500/50"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-mono">
                                            👉 {displayResult}
                                        </h3>

                                        <button
                                            onClick={() =>
                                                navigator.clipboard.writeText(displayResult)
                                            }
                                        >
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SIDE (History) */}
                    <div>
                        <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-5 sticky top-6 backdrop-blur-md">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xs text-gray-500">Recent History</h2>

                                <button
                                    onClick={() => dispatch(fetchHistory())}
                                    className={`p-2 rounded-md hover:bg-gray-700 transition ${historyLoading ? 'animate-spin' : ''
                                        }`}
                                >
                                    🔄
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">

                                {/* Loading */}
                                {historyLoading && history.length === 0 ? (
                                    <div className="text-center py-10 text-gray-600">
                                        Loading...
                                    </div>
                                ) : history.length === 0 ? (
                                    <div className="text-center py-10 text-gray-600 italic">
                                        No history found
                                    </div>
                                ) : (
                                    history.slice(0, 5).map((item) => (
                                        <div
                                            key={item.id}
                                            className="group p-1 bg-gray-900/40 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all"
                                        >

                                            {/* Top Row */}
                                            <div className="flex justify-between items-start mb-1">

                                                <span className={"text-[10px] font-black px-2 py-0.5 rounded"
                                                    + (item.operation === 'ADD' ? ' bg-green-500/10 text-green-500'
                                                        : item.operation === 'CONVERT' ? ' bg-blue-500/10 text-blue-500'
                                                            : item.operation === 'SUBTRACT' ? ' bg-yellow-500/10 text-yellow-500'
                                                                : ' bg-purple-500/10 text-purple-500')} >
                                                    {item.operation}
                                                </span>

                                                <span className="text-[10px] text-gray-600 font-mono">
                                                    #{item.id}
                                                </span>
                                            </div>

                                            {formatHistoryItem(item)}
                                            <p className="text-sm text-gray-300 font-mono leading-relaxed">
                                                {item.display}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OperationsPage;