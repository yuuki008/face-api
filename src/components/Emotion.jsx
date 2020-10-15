import React from 'react'
import {ResponsiveContainer, PieChart, Pie, Cell} from 'recharts'

const Emotion = ({emotion, image}) => {
    const data = [
        { emotion: '怒り', value: emotion.anger * 100, color: "#996633"},
        { emotion: '混乱', value: emotion.contempt * 100, color: "#9933FF"},
        { emotion: '嫌悪', value: emotion.disgust * 100, color: "#9900FF"},
        { emotion: '無感情', value: emotion.neutral * 100, color: "#99FFFF"},
        { emotion: '恐怖', value: emotion.fear * 100, color: "#999966"},
        { emotion: '幸福', value: emotion.happiness * 100, color: "#99FF00"},
        { emotion: '悲しみ', value: emotion.sadness * 100, color: "#99CCFF" },
        { emotion: '驚き', value: emotion.surprise * 100, color: "#990033"},
    ];

    const newData = data.filter(item => item.value !== 0)
    console.log(newData)

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, emotion, value}) => {
         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
         const sin = Math.sin(-RADIAN * midAngle);
         const cos = Math.cos(-RADIAN * midAngle)
         const mx = cx + (outerRadius + 30) * cos;
         const ex = mx + (cos >= 0 ? 1 : -1) * 22;
         const my = cy + (outerRadius + 90) * sin;
         const ey = my;
         const val = value.toFixed(1)
        return (
            <text textAnchor="middle" fill="black" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} fontSize="12px" fontWeight={400}>{emotion}:{val}%</text>
        )
    };

    return (
        <div className="emotion">
            <div className="emotion__pie">
                <ResponsiveContainer width="99%" height={370}>
                    <PieChart textAncor="center" className="pie__chart">
                        <Pie
                            data={newData}
                            cy={180}
                            label={renderCustomizedLabel}
                            outerRadius={180}
                            fillOpacity={0.7}
                            dataKey="value"
                            paddingAngle={1}
                        >
                            { data.map((data, index) => 
                                <Cell key={index} fill={data.color}/>
                            )}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="emotion__info">
                {newData.map(data => 
                <p key={data.emotion}>{data.emotion}:{(data.value).toFixed(1)}%</p>
                )}
                </div>
            </div>
        </div>
    )
}

export default Emotion
