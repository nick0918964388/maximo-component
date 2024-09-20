'use client'

import React, { useState } from 'react'
import { User, Users, Building, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react'

interface Employee {
  name: string;
  title: string;
  signTime: string;
  comment: string;
}

interface Department {
  name: string;
  manager: Employee;
  engineers: Employee[];
}

const departments: Department[] = [
  {
    name: "研發部",
    manager: { 
      name: "張三", 
      title: "研發經理", 
      signTime: "2023-06-15 09:30",
      comment: "同意，請加快進度"
    },
    engineers: [
      { 
        name: "李四", 
        title: "資深工程師", 
        signTime: "2023-06-15 10:15",
        comment: "已完成初步設計"
      },
      { 
        name: "王五", 
        title: "工程師", 
        signTime: "2023-06-15 11:00",
        comment: "正在進行測試"
      },
    ]
  },
  {
    name: "生產部",
    manager: { 
      name: "趙六", 
      title: "生產經理", 
      signTime: "2023-06-15 13:45",
      comment: "生產線已準備就緒"
    },
    engineers: [
      { 
        name: "孫七", 
        title: "製程工程師", 
        signTime: "2023-06-15 14:30",
        comment: "製程優化完成"
      },
      { 
        name: "周八", 
        title: "品管工程師", 
        signTime: "2023-06-15 15:15",
        comment: "品質檢測無異常"
      },
    ]
  }
]

const management: Department = {
  name: "管理層",
  manager: { 
    name: "吳九", 
    title: "廠長", 
    signTime: "2023-06-16 09:00",
    comment: "核准，請按計劃執行"
  },
  engineers: [
    { 
      name: "郭十", 
      title: "副廠長", 
      signTime: "2023-06-15 17:30",
      comment: "已審核，提交廠長審批"
    }
  ]
}

function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm">
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-blue-500 flex-shrink-0" />
        <div className="flex-grow">
          <p className="font-medium">{employee.name}</p>
          <p className="text-sm text-gray-600">{employee.title}</p>
        </div>
        <p className="text-xs text-gray-400">{employee.signTime}</p>
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">{employee.comment}</p>
    </div>
  )
}

function DepartmentCard({ department }: { department: Department }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-white rounded-lg shadow-md w-80 flex-shrink-0">
      <div 
        className="flex items-center justify-between cursor-pointer p-4 h-16"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold flex items-center">
          {department.name === "管理層" ? <Building className="w-5 h-5 mr-2 text-blue-500" /> : <Users className="w-5 h-5 mr-2 text-blue-500" />}
          {department.name}
        </h3>
        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </div>
      <div className={`mt-3 space-y-2 p-4 pt-0 ${isExpanded ? 'block' : 'hidden'}`}>
        <EmployeeCard employee={department.manager} />
        {department.engineers.map((engineer, index) => (
          <React.Fragment key={index}>
            <ArrowRight className="w-4 h-4 mx-auto text-gray-400 transform rotate-90" />
            <EmployeeCard employee={engineer} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function CollapsibleOrgChart() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">核簽紀錄</h1>
      <div className="overflow-x-auto">
        <div className="flex items-start space-x-4 pb-4">
          {departments.map((dept, index) => (
            <React.Fragment key={index}>
              <DepartmentCard department={dept} />
              <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0 mt-4" />
            </React.Fragment>
          ))}
          <DepartmentCard department={management} />
        </div>
      </div>
    </div>
  )
}