import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
    Mail,
    Phone,
    MapPin,
    Star,
    Check,
    Square,
    ChevronDown,
    Pencil,
    Trash2,
    Save,
    User,
} from "lucide-react";

//
// أنواع البيانات
//
interface StatItem {
    id: string;
    label: string;
    value: string;
    icon: string;
    iconAlt: string;
}

interface Volunteer {
    name: string;
    email: string;
    phone: string;
    status: string;
    skills: string[];
    completedTasks: number;
    currentTasks: number;
    rating: number;
    joinDate: string;
    currentProjects: string[];
    location: string;
    volunteerHours: number;
}

interface Subtask {
    id: string;
    title: string;
    completed: boolean;
}

interface Task {
    id: string;
    title: string;
    project: string;
    volunteerName: string;
    status: string; // "قيد التنفيذ" | "في الانتظار" | "مكتملة" | "معلقة"
    priority: string;
    dueDate: string;
    hours: number;
    progress: number;
    description?: string;
    subtasks?: Subtask[];
}

//
// هيلبرز
//
const getCityFromLocation = (location: string) =>
    location.split("-")[0].trim();

const getInitial = (name: string) => name.trim().charAt(0);

const getStatusClasses = (status: string) => {
    switch (status) {
        case "مكتملة":
            return "bg-[#d5f3df] text-[#1d6b3a]";
        case "قيد التنفيذ":
            return "bg-[#e0ecff] text-[#155fa0]";
        case "في الانتظار":
            return "bg-[#fff3c9] text-[#a67912]";
        case "معلقة":
            return "bg-[#f3e8ff] text-[#6b3aa7]";
        default:
            return "bg-[#e4e0e1] text-[#6b6567]";
    }
};

const getProgressBarColor = () => "#c87981";

//
// بيانات ابتدائية
//
const initialTasks: Task[] = [
    {
        id: "task-1",
        title: "تصميم واجهة المستخدم الرئيسية",
        project: "منصة المتطوعين",
        volunteerName: "فاطمة سالم",
        status: "قيد التنفيذ",
        priority: "عالية",
        dueDate: "2024-02-15",
        hours: 10,
        progress: 65,
        description:
            "تصميم واجهة رئيسية متجاوبة للمنصة تتضمن صفحة لوحة التحكم وصفحة تسجيل الدخول مع الالتزام بدليل الهوية البصرية للجمعية.",
        subtasks: [
            { id: "t1-1", title: "تحليل احتياج الصفحات والعناصر", completed: true },
            { id: "t1-2", title: "تصميم الـ Wireframes", completed: true },
            { id: "t1-3", title: "تصميم الواجهة عالية الدقة (UI)", completed: false },
            { id: "t1-4", title: "مراجعة التصميم مع فريق الجمعية", completed: false },
        ],
    },
    {
        id: "task-2",
        title: "تطوير صفحة تسجيل الدخول",
        project: "موقع الجمعية",
        volunteerName: "احمد محمد علي",
        status: "مكتملة",
        priority: "متوسطة",
        dueDate: "2024-02-10",
        hours: 8,
        progress: 100,
        description:
            "بناء صفحة تسجيل دخول للمتطوعين مع التحقق من البيانات والتكامل مع واجهة الـ API.",
        subtasks: [
            { id: "t2-1", title: "إنشاء نموذج تسجيل الدخول", completed: true },
            { id: "t2-2", title: "ربط الـ API والتحقق من البيانات", completed: true },
            { id: "t2-3", title: "إضافة رسائل الخطأ والحالات", completed: true },
        ],
    },
    {
        id: "task-3",
        title: "كتابة محتوى الحملة الإعلانية",
        project: "حملة التوعية",
        volunteerName: "سارة أحمد",
        status: "قيد التنفيذ",
        priority: "منخفضة",
        dueDate: "2024-02-20",
        hours: 6,
        progress: 30,
        description:
            "كتابة نصوص الحملة الإعلانية على منصات التواصل الاجتماعي للتعريف ببرامج التطوع.",
        subtasks: [
            { id: "t3-1", title: "تجميع المعلومات عن البرامج", completed: true },
            { id: "t3-2", title: "صياغة نصوص أولية", completed: false },
            { id: "t3-3", title: "مراجعة الصياغة مع فريق التسويق", completed: false },
        ],
    },
    {
        id: "task-4",
        title: "تحليل بيانات المستخدمين",
        project: "تطوير التطبيق",
        volunteerName: "عمر خالد",
        status: "في الانتظار",
        priority: "متوسطة",
        dueDate: "2024-02-25",
        hours: 12,
        progress: 0,
        description:
            "تحليل بيانات تفاعل المستخدمين داخل التطبيق لاستخراج مؤشرات تساعد على تحسين التجربة.",
        subtasks: [
            { id: "t4-1", title: "إعداد لوحة تتبع للبيانات الأساسية", completed: false },
            { id: "t4-2", title: "تحليل سلوك الدخول والخروج", completed: false },
            { id: "t4-3", title: "كتابة تقرير بالتوصيات النهائية", completed: false },
        ],
    },
];

const initialVolunteers: Volunteer[] = [
    {
        name: "احمد محمد علي",
        email: "ahmed@example.com",
        phone: "+966501234567",
        status: "نشط",
        skills: ["مطور ويب", "React", "Javascript"],
        completedTasks: 12,
        currentTasks: 3,
        rating: 4.8,
        joinDate: "2024-01-01",
        currentProjects: ["موقع الجمعية", "تنسيق الفعاليات"],
        location: "الرياض - حي النرجس",
        volunteerHours: 15,
    },
    {
        name: "فاطمة سالم",
        email: "fatima@example.com",
        phone: "+9660554321",
        status: "نشط",
        skills: ["UI/UX تصميم", "Figma", "Adobe Creative"],
        completedTasks: 8,
        currentTasks: 2,
        rating: 4.9,
        joinDate: "2024-01-05",
        currentProjects: ["حملة التوعية", "تجديد الهوية البصرية"],
        location: "جدة - حي السلامة",
        volunteerHours: 20,
    },
    {
        name: "عمر خالد",
        email: "omar@example.com",
        phone: "+966501234567",
        status: "مشغول",
        skills: ["تحليل البيانات", "ادارة المشاريع"],
        completedTasks: 15,
        currentTasks: 5,
        rating: 4.7,
        joinDate: "2023-12-20",
        currentProjects: ["تطوير التطبيق", "بحث السوق"],
        location: "القصيم",
        volunteerHours: 27,
    },
    {
        name: "سارة أحمد",
        email: "sara@example.com",
        phone: "+966507654321",
        status: "غير نشط",
        skills: ["كتابة محتوى", "التسويق الرقمي"],
        completedTasks: 5,
        currentTasks: 0,
        rating: 4.5,
        joinDate: "2024-01-10",
        currentProjects: ["حملة التسويق"],
        location: "الدمام",
        volunteerHours: 8,
    },
];

//
// كارد الإحصائيات
//
const ProjectOverviewSection: React.FC = () => {
    const stats: StatItem[] = [
        {
            id: "total-volunteers",
            label: "اجمالي المتطوعين",
            value: "4",
            icon: "https://c.animaapp.com/u4OaXzk0/img/multiple-neutral-2-streamline-ultimate-regular@2x.png",
            iconAlt: "People",
        },
        {
            id: "active-volunteers",
            label: "المتطوعين النشطين",
            value: "2",
            icon: "https://c.animaapp.com/u4OaXzk0/img/famicons-star-outline.svg",
            iconAlt: "Star",
        },
        {
            id: "total-hours",
            label: "اجمالي الساعات",
            value: "26",
            icon: "https://c.animaapp.com/u4OaXzk0/img/time-clock-file-setting-streamline-ultimate-regular@2x.png",
            iconAlt: "Clock",
        },
        {
            id: "completed-tasks",
            label: "المهام المكتملة",
            value: "1",
            icon: "https://c.animaapp.com/u4OaXzk0/img/list-to-do-streamline-ultimate-regular@2x.png",
            iconAlt: "Checkmark",
        },
    ];

    return (
        <section
            aria-labelledby="volunteer-stats-heading"
            dir="rtl"
            className="w-full bg-[#f3e3e3] rounded-[19px] shadow-[0px_3px_25px_#8d2e4673] px-8 py-7 space-y-6"
        >
            <div className="flex justify-center">
                <h2
                    id="volunteer-stats-heading"
                    className="font-bold text-[#2e2b2c] text-[24px] md:text-[32px] text-center font-[Cairo]"
                >
                    احصائيات المتطوعين
                </h2>
            </div>

            <div className="w-[80%] mx-auto h-[2px] bg-[#e0cfd4] opacity-80" />

            <div className="mt-4 flex flex-col md:flex-row items-stretch justify-between gap-8">
                {stats.map((stat, index) => (
                    <div
                        key={stat.id}
                        className="flex-1 flex flex-col items-center gap-3 relative"
                    >
                        {index > 0 && (
                            <span className="hidden md:block absolute top-2 bottom-2 left-full w-px bg-[#d2b8c0]" />
                        )}

                        <img
                            src={stat.icon}
                            alt={stat.iconAlt}
                            className="w-[58px] h-[58px] object-contain"
                        />

                        <div className="text-[26px] md:text-[32px] font-bold text-[#8d2e46] leading-none">
                            {stat.value}
                        </div>

                        <div className="text-sm md:text-base text-[#2e2b2c] font-medium text-center font-[Cairo]">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

//
// تبويب المهام والمتطوعين
//
interface TasksVolunteersTabsProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    volunteers: Volunteer[];
}

const TasksVolunteersTabs: React.FC<TasksVolunteersTabsProps> = ({
    tasks,
    setTasks,
    volunteers,
}) => {
    const [activeTab, setActiveTab] = useState<"tasks" | "volunteers">(
        "volunteers"
    );

    const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
        null
    );
    const [assignVolunteer, setAssignVolunteer] = useState<Volunteer | null>(
        null
    );
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // دايلوق تحديث المهمة
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editStatus, setEditStatus] = useState<string>("");
    const [editDueDate, setEditDueDate] = useState<string>("");
    const [editHours, setEditHours] = useState<number>(0);
    const [editSubtasks, setEditSubtasks] = useState<Subtask[]>([]);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);

    const adminInfo = {
        name: "إدارة الجمعية",
        email: "admin@example.com",
        role: "مسؤول المهام",
    };

    const assignableTasks = tasks.filter((t) => t.status !== "مكتملة");

    const statusOptions = [
        { value: "قيد التنفيذ", label: "قيد التنفيذ" },
        { value: "في الانتظار", label: "في الانتظار" },
        { value: "معلقة", label: "معلقة" },
        { value: "مكتملة", label: "مكتملة" },
    ];

    // فتح دايلوق تحديث المهمة
    const handleOpenEditTask = (task: Task) => {
        setEditingTask(task);
        setEditStatus(task.status);
        setEditDueDate(task.dueDate);
        setEditHours(task.hours);
        setEditSubtasks(task.subtasks ? [...task.subtasks] : []);
        setIsStatusOpen(false);
        setEditingSubtaskId(null);
    };

    const handleCloseEditTask = () => {
        setEditingTask(null);
        setIsStatusOpen(false);
        setEditingSubtaskId(null);
    };

    const handleChangeSubtaskTitle = (id: string, title: string) => {
        setEditSubtasks((prev) =>
            prev.map((st) => (st.id === id ? { ...st, title } : st))
        );
    };

    const handleToggleSubtaskCompleted = (id: string) => {
        setEditSubtasks((prev) =>
            prev.map((st) =>
                st.id === id ? { ...st, completed: !st.completed } : st
            )
        );
    };

    const handleAddSubtask = () => {
        const newId = `new-${Date.now()}`;
        const newSubtask: Subtask = {
            id: newId,
            title: "",
            completed: false,
        };
        setEditSubtasks((prev) => [...prev, newSubtask]);
        setEditingSubtaskId(newId);
    };

    const handleRemoveSubtask = (id: string) => {
        setEditSubtasks((prev) => prev.filter((st) => st.id !== id));
        if (editingSubtaskId === id) {
            setEditingSubtaskId(null);
        }
    };

    const handleSaveTaskChanges = () => {
        if (!editingTask) return;

        let newProgress = editingTask.progress;
        if (editSubtasks.length > 0) {
            const completedCount = editSubtasks.filter((st) => st.completed).length;
            newProgress = Math.round((completedCount / editSubtasks.length) * 100);
        }

        const updated: Task = {
            ...editingTask,
            status: editStatus || editingTask.status,
            dueDate: editDueDate,
            hours: editHours,
            subtasks: editSubtasks,
            progress: newProgress,
        };

        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTask(null);
        setIsStatusOpen(false);
        setEditingSubtaskId(null);
    };

    // تعيين مهمة للمتطوع في بوب اب "تعيين مهمة"
    const handleAssignTaskToCurrentVolunteer = (taskId: string) => {
        if (!assignVolunteer) return;

        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId
                    ? {
                        ...t,
                        volunteerName: assignVolunteer.name,
                    }
                    : t
            )
        );

        setAssignVolunteer(null);
    };

    return (
        <section dir="rtl" className="w-full space-y-4">
            {/* التبويبات */}
            <div className="w-full bg-[#c87981] rounded-[18px] px-2 py-2 shadow-[0px_3px_15px_#8d2e4626]">
                <div className="flex flex-row-reverse">
                    <button
                        type="button"
                        onClick={() => setActiveTab("tasks")}
                        className={[
                            "flex-1 px-4 py-2 rounded-[14px] text-sm md:text-base font-[Cairo] transition-all duration-150",
                            activeTab === "tasks"
                                ? "bg-[#fdf8f9] text-[#2e2b2c] shadow-[0px_2px_8px_#8d2e4680]"
                                : "bg-transparent text-[#fdf8f9]",
                        ].join(" ")}
                    >
                        المهام
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("volunteers")}
                        className={[
                            "flex-1 px-4 py-2 rounded-[14px] text-sm md:text-base font-[Cairo] transition-all duration-150",
                            activeTab === "volunteers"
                                ? "bg-[#fdf8f9] text-[#2e2b2c] shadow-[0px_2px_8px_#8d2e4680]"
                                : "bg-transparent text-[#fdf8f9]",
                        ].join(" ")}
                    >
                        المتطوعين
                    </button>
                </div>
            </div>

            {/* المحتوى */}
            <div className="w-full bg-[#fdf8f9] rounded-[16px] shadow-[0px_3px_15px_#8d2e4626] px-5 py-4 min-h-[160px]">
                {activeTab === "tasks" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {tasks.slice(0, 4).map((t) => {
                            const isCompleted = t.status === "مكتملة";

                            return (
                                <div
                                    key={t.id}
                                    className="bg-[#f3e3e3] rounded-[18px] px-4 py-3 shadow-[0px_3px_15px_#8d2e4633] space-y-3"
                                >
                                    {/* العنوان + الحالة */}
                                    <div className="flex items-start justify-between gap-3">
                                        <h3
                                            className={
                                                "flex-1 text-[17px] md:text-[18px] font-bold font-[Cairo] text-right leading-snug " +
                                                (isCompleted
                                                    ? "text-[#7c7577] line-through"
                                                    : "text-[#2e2b2c]")
                                            }
                                        >
                                            {t.title}
                                        </h3>
                                        <span
                                            className={[
                                                "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-[Cairo]",
                                                getStatusClasses(t.status),
                                            ].join(" ")}
                                        >
                                            {t.status}
                                        </span>
                                    </div>

                                    {/* تفاصيل */}
                                    <div className="space-y-1 text-[12px] text-[#4e4a4b] font-[Cairo]">
                                        <div className="flex justify-between">
                                            <span>المكلف :</span>
                                            <span>{t.volunteerName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>الأولوية :</span>
                                            <span>{t.priority}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>تاريخ الاستحقاق :</span>
                                            <span>{t.dueDate}</span>
                                        </div>
                                    </div>

                                    {/* التقدم */}
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center justify-between text-[11px] text-[#4e4a4b] font-[Cairo]">
                                            <span>التقدم :</span>
                                            <span>{t.progress}%</span>
                                        </div>
                                        <div className="w-full h-[6px] rounded-full bg-[#f0dde2] overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${t.progress}%`,
                                                    backgroundColor: getProgressBarColor(),
                                                    transition: "width 0.3s ease",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* الأزرار */}
                                    <div className="flex justify-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="px-3 py-[6px] rounded-[999px] text-[11px] bg-[#fdf8f9] text-[#8d2e46] border border-[#e0cfd4] font-[Cairo]"
                                            onClick={() => setSelectedTask(t)}
                                        >
                                            تفاصيل المهمة
                                        </button>
                                        <button
                                            type="button"
                                            className="px-3 py-[6px] rounded-[999px] text-[11px] bg-[#8d2e46] text-white font-[Cairo]"
                                            onClick={() => handleOpenEditTask(t)}
                                        >
                                            تحديث المهمة
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {volunteers.map((v) => {
                            const completedCount = v.completedTasks;
                            const currentCount = v.currentTasks;

                            return (
                                <div
                                    key={v.email}
                                    className="bg-[#f3e3e3] rounded-[18px] px-4 py-3 shadow-[0px_3px_15px_#8d2e4633] space-y-3"
                                >
                                    {/* الاسم + الحالة */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[18px] font-bold text-[#2e2b2c] font-[Cairo]">
                                            {v.name}
                                        </h3>
                                        <span
                                            className={[
                                                "inline-flex items-center px-3 py-1 rounded-full text-xs font-[Cairo]",
                                                v.status === "نشط"
                                                    ? "bg-[#cef2d4] text-[#1d6b3a]"
                                                    : v.status === "مشغول"
                                                        ? "bg-[#ffe9c4] text-[#a76511]"
                                                        : "bg-[#e4e0e1] text-[#6b6567]",
                                            ].join(" ")}
                                        >
                                            {v.status}
                                        </span>
                                    </div>

                                    {/* تواصل */}
                                    <div className="flex flex-wrap gap-6 mt-1 text-[12px] text-[#4e4a4b] font-[Cairo]">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={15} className="text-[#8d2e46]" />
                                            <span>{getCityFromLocation(v.location)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Mail size={15} className="text-[#8d2e46]" />
                                            <span>{v.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone size={15} className="text-[#8d2e46]" />
                                            <span>{v.phone}</span>
                                        </div>
                                    </div>

                                    {/* المهارات */}
                                    <div className="mt-2 text-right">
                                        <div className="text-[13px] font-[Cairo] font-semibold text-[#2e2b2c] mb-1">
                                            المهارات :
                                        </div>
                                        <div className="flex flex-wrap gap-2 justify-start">
                                            {v.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-[4px] rounded-full border border-[#8d2e46] text-[11px] text-[#8d2e46] font-[Cairo] bg-transparent"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* إحصائيات صغيرة */}
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3 font-[Cairo]">
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-[11px] text-[#6b6567]">
                                                تاريخ الانضمام
                                            </span>
                                            <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                                {v.joinDate}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-[11px] text-[#6b6567]">التقييم</span>
                                            <span className="flex items-center justify-center gap-1 text-[13px] font-semibold text-[#2e2b2c]">
                                                {v.rating}
                                                <Star size={14} className="text-[#f2b01e]" />
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-[11px] text-[#6b6567]">
                                                المهام المكتملة
                                            </span>
                                            <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                                {completedCount}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-[11px] text-[#6b6567]">
                                                المهام الحالية
                                            </span>
                                            <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                                {currentCount}
                                            </span>
                                        </div>
                                    </div>

                                    {/* المشاريع + الأزرار */}
                                    <div className="mt-3 space-y-2">
                                        <div className="text-right">
                                            <div className="text-[13px] font-[Cairo] font-semibold text-[#2e2b2c] mb-1">
                                                المشاريع الحالية :
                                            </div>
                                            <div className="flex flex-wrap gap-2 justify-start text-[11px] text-[#6b6567] font-[Cairo]">
                                                {v.currentProjects.map((p) => (
                                                    <span
                                                        key={p}
                                                        className="px-3 py-[4px] rounded-full bg-[#e9d5da] text-[#4e2a35]"
                                                    >
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 justify-end">
                                            <button
                                                className="px-3 py-[6px] rounded-[999px] text-[11px] bg-[#fdf8f9] text-[#8d2e46] border border-[#e0cfd4] font-[Cairo]"
                                                onClick={() => setSelectedVolunteer(v)}
                                            >
                                                تفاصيل المتطوع
                                            </button>
                                            <button
                                                className="px-3 py-[6px] rounded-[999px] text-[11px] bg-[#8d2e46] text-white font-[Cairo]"
                                                onClick={() => setAssignVolunteer(v)}
                                            >
                                                تعيين مهمة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 🔹 دايلوق تفاصيل المتطوع */}
            {selectedVolunteer && (
                <div
                    dir="rtl"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setSelectedVolunteer(null)}
                >
                    <div
                        className="bg-[#fdf8f9] rounded-[20px] shadow-[0px_8px_25px_#00000040] w-[95%] max-w-[650px] px-6 py-5 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-[90px] h-[90px] rounded-full bg-[#e9d5da] flex items-center justify-center text-[#4e2a35] font-bold text-[36px]">
                                {getInitial(selectedVolunteer.name)}
                            </div>

                            <div className="flex-1 space-y-2 text-right">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-[20px] md:text-[22px] font-bold text-[#2e2b2c] font-[Cairo]">
                                        {selectedVolunteer.name}
                                    </h3>
                                    <span
                                        className={[
                                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-[Cairo]",
                                            selectedVolunteer.status === "نشط"
                                                ? "bg-[#cef2d4] text-[#1d6b3a]"
                                                : selectedVolunteer.status === "مشغول"
                                                    ? "bg-[#ffe9c4] text-[#a76511]"
                                                    : "bg-[#e4e0e1] text-[#6b6567]",
                                        ].join(" ")}
                                    >
                                        {selectedVolunteer.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-[12px] text-[#4e4a4b] font-[Cairo]">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={15} className="text-[#8d2e46]" />
                                        <span>{selectedVolunteer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Mail size={15} className="text-[#8d2e46]" />
                                        <span>{selectedVolunteer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Phone size={15} className="text-[#8d2e46]" />
                                        <span>{selectedVolunteer.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 font-[Cairo]">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-[11px] text-[#6b6567]">تاريخ الانضمام</span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedVolunteer.joinDate}
                                </span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-[11px] text-[#6b6567]">التقييم</span>
                                <span className="flex items-center justify-center gap-1 text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedVolunteer.rating}
                                    <Star size={14} className="text-[#f2b01e]" />
                                </span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-[11px] text-[#6b6567]">الساعات التطوعية</span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedVolunteer.volunteerHours}
                                </span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-[11px] text-[#6b6567]">المهام المكتملة</span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedVolunteer.completedTasks}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <div className="text-[13px] font-[Cairo] font-semibold text-[#2e2b2c]">
                                المهارات :
                            </div>
                            <div className="flex flex-wrap gap-2 justify-start">
                                {selectedVolunteer.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-[4px] rounded-full border border-[#8d2e46] text-[11px] text-[#8d2e46] font-[Cairo] bg-transparent"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <div className="text-[13px] font-[Cairo] font-semibold text-[#2e2b2c]">
                                المشاريع الحالية :
                            </div>
                            <div className="flex flex-wrap gap-2 justify-start text-[11px] text-[#6b6567] font-[Cairo]">
                                {selectedVolunteer.currentProjects.map((p) => (
                                    <span
                                        key={p}
                                        className="px-3 py-[4px] rounded-full bg-[#e9d5da] text-[#4e2a35]"
                                    >
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setSelectedVolunteer(null)}
                                className="px-4 py-2 rounded-[999px] text-[12px] bg-[#f3e3e3] text-[#2e2b2c] font-[Cairo] border border-[#e0cfd4]"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 دايلوق تعيين مهمة */}
            {assignVolunteer && (
                <div
                    dir="rtl"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setAssignVolunteer(null)}
                >
                    <div
                        className="bg-[#fdf8f9] rounded-[20px] shadow-[0px_8px_25px_#00000040] w-[95%] max-w-[750px] px-6 py-5 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-2 mb-2">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#2e2b2c] font-[Cairo]">
                                    تعيين مهمة لـ {assignVolunteer.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-full bg-[#e9d5da] flex items-center justify-center text-[#4e2a35] font-bold text-sm">
                                        {getInitial(adminInfo.name)}
                                    </div>
                                    <div className="text-[11px] text-right font-[Cairo]">
                                        <div className="font-semibold text-[#2e2b2c]">
                                            {adminInfo.name}
                                        </div>
                                        <div className="text-[#6b6567]">{adminInfo.role}</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[12px] text-[#6b6567] font-[Cairo]">
                                اختر إحدى المهام المتاحة أدناه لتعيينها لهذا المتطوع. هذه المهام
                                هي المهام الحالية / الجديدة غير المكتملة عند الإدارة.
                            </p>
                        </div>

                        <div className="max-h-[340px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                            {assignableTasks.length === 0 ? (
                                <div className="text-center text-[13px] text-[#6b6567] font-[Cairo] py-6">
                                    لا توجد مهام متاحة للتعيين حاليًا.
                                </div>
                            ) : (
                                assignableTasks.map((t) => (
                                    <div
                                        key={t.id}
                                        className="bg-[#f3e3e3] rounded-[16px] px-4 py-3 shadow-[0px_3px_10px_#8d2e4626] space-y-3"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="text-[14px] font-[Cairo] font-bold text-[#2e2b2c] text-right">
                                                    {t.title}
                                                </div>
                                                <div className="text-[11px] font-[Cairo] text-[#6b6567] mt-1 text-right">
                                                    المشروع: {t.project}
                                                </div>
                                            </div>
                                            <span
                                                className={[
                                                    "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-[Cairo]",
                                                    getStatusClasses(t.status),
                                                ].join(" ")}
                                            >
                                                {t.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-[11px] text-[#4e4a4b] font-[Cairo]">
                                            <span>الأولوية: {t.priority}</span>
                                            <span>تاريخ الاستحقاق: {t.dueDate}</span>
                                            <span>الساعات التقديرية: {t.hours}</span>
                                        </div>

                                        <div className="mt-2 space-y-1">
                                            <div className="flex items-center justify-between text-[11px] text-[#4e4a4b] font-[Cairo]">
                                                <span>التقدم :</span>
                                                <span>{t.progress}%</span>
                                            </div>
                                            <div className="w-full h-[6px] rounded-full bg-[#f0dde2] overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${t.progress}%`,
                                                        backgroundColor: getProgressBarColor(),
                                                        transition: "width 0.3s ease",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="button"
                                                className="px-3 py-[6px] rounded-[999px] text-[11px] bg-[#8d2e46] text-white font-[Cairo]"
                                                onClick={() =>
                                                    handleAssignTaskToCurrentVolunteer(t.id)
                                                }
                                            >
                                                تعيين هذه المهمة
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setAssignVolunteer(null)}
                                className="px-4 py-2 rounded-[999px] text-[12px] bg-[#f3e3e3] text-[#2e2b2c] font-[Cairo] border border-[#e0cfd4]"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 دايلوق تفاصيل المهمة */}
            {selectedTask && (
                <div
                    dir="rtl"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setSelectedTask(null)}
                >
                    <div
                        className="bg-[#fdf8f9] rounded-[20px] shadow-[0px_8px_25px_#00000040] w-[95%] max-w-[720px] px-6 py-5 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* الهيدر */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1 text-right">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#2e2b2c] font-[Cairo]">
                                    {selectedTask.title}
                                </h3>
                                <div className="text-[12px] text-[#6b6567] font-[Cairo]">
                                    المشروع: {selectedTask.project}
                                </div>
                            </div>
                            <span
                                className={[
                                    "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-[Cairo]",
                                    getStatusClasses(selectedTask.status),
                                ].join(" ")}
                            >
                                {selectedTask.status}
                            </span>
                        </div>

                        {/* وصف المهمة */}
                        {selectedTask.description && (
                            <div className="text-[13px] text-[#4e4a4b] font-[Cairo] text-right leading-relaxed bg-[#f3e3e3] rounded-[14px] px-3 py-3">
                                {selectedTask.description}
                            </div>
                        )}

                        {/* معلومات أساسية – بالوسط */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 font-[Cairo] text-right">
                            <div className="flex flex-col items-center gap-[2px] text-center">
                                <span className="text-[11px] text-[#6b6567]">المكلّف</span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedTask.volunteerName}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-[2px] text-center">
                                <span className="text-[11px] text-[#6b6567]">الأولوية</span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedTask.priority}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-[2px] text-center">
                                <span className="text-[11px] text-[#6b6567]">
                                    تاريخ الاستحقاق
                                </span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedTask.dueDate}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-[2px] text-center">
                                <span className="text-[11px] text-[#6b6567]">
                                    الساعات التقديرية
                                </span>
                                <span className="text-[13px] font-semibold text-[#2e2b2c]">
                                    {selectedTask.hours}
                                </span>
                            </div>
                        </div>

                        {/* التقدم في المهمة */}
                        <div className="space-y-1 mt-2">
                            <div className="flex items-center justify-between text-[11px] text-[#4e4a4b] font-[Cairo]">
                                <span>نسبة التقدم الحالية :</span>
                                <span>{selectedTask.progress}%</span>
                            </div>
                            <div className="w-full h-[6px] rounded-full bg-[#f0dde2] overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${selectedTask.progress}%`,
                                        backgroundColor: getProgressBarColor(),
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </div>
                        </div>

                        {/* المهام الفرعية */}
                        {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
                            <div className="space-y-2 mt-3">
                                <div className="text-[13px] font-[Cairo] font-semibold text-[#2e2b2c] text-right">
                                    المهام الفرعية (يبنى عليها التقدم) :
                                </div>
                                <div className="space-y-1">
                                    {selectedTask.subtasks.map((st) => (
                                        <div
                                            key={st.id}
                                            className="flex items-center justify-between bg-[#f3e3e3] rounded-[12px] px-3 py-2 text-[12px] font-[Cairo]"
                                        >
                                            <div className="flex items-center gap-2">
                                                {st.completed ? (
                                                    <Check size={16} className="text-[#1d6b3a]" />
                                                ) : (
                                                    <Square size={16} className="text-[#a67912]" />
                                                )}
                                                <span
                                                    className={
                                                        st.completed
                                                            ? "text-[#6b6567] line-through"
                                                            : "text-[#2e2b2c]"
                                                    }
                                                >
                                                    {st.title}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setSelectedTask(null)}
                                className="px-4 py-2 rounded-[999px] text-[12px] bg-[#f3e3e3] text-[#2e2b2c] font-[Cairo] border border-[#e0cfd4]"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 دايلوق تحديث المهمة */}
            {editingTask && (
                <div
                    dir="rtl"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={handleCloseEditTask}
                >
                    <div
                        className="bg-[#fdf8f9] rounded-[20px] shadow-[0px_8px_25px_#00000040] w-[95%] max-w-[720px] px-6 py-5 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* الهيدر */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 text-right space-y-1">
                                <h3 className="text-[20px] md:text-[22px] font-bold text-[#2e2b2c] font-[Cairo]">
                                    تحديث المهمة
                                </h3>
                                <div className="text-[12px] text-[#6b6567] font-[Cairo]">
                                    {editingTask.title} – {editingTask.project}
                                </div>
                            </div>
                            <span
                                className={[
                                    "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-[Cairo]",
                                    getStatusClasses(editStatus || editingTask.status),
                                ].join(" ")}
                            >
                                {editStatus || editingTask.status}
                            </span>
                        </div>

                        {/* الحقول الأساسية */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 font-[Cairo] text-right">
                            {/* دروب داون حالة المهمة */}
                            <div className="flex flex-col gap-[4px]">
                                <label className="text-[11px] text-[#6b6567]">
                                    حالة المهمة
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsStatusOpen((prev) => !prev)}
                                        className="w-full h-[40px] rounded-[12px] border border-[#e0cfd4] bg-white px-3 flex items-center justify-between text-[13px] text-[#2e2b2c]"
                                    >
                                        <span className="flex-1 text-right">
                                            {editStatus || "اختر حالة المهمة"}
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-[#8d2e46]" />
                                    </button>

                                    {isStatusOpen && (
                                        <div className="absolute z-10 mt-1 w-full rounded-[12px] bg-white shadow-[0px_8px_20px_#00000026] border border-[#e0cfd4] overflow-hidden text-[13px]">
                                            {statusOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setEditStatus(opt.value);
                                                        setIsStatusOpen(false);
                                                    }}
                                                    className={`w-full text-right px-4 py-2 flex items-center justify-between hover:bg-[#fdf1f4] ${editStatus === opt.value ? "bg-[#f3e3e8]" : ""
                                                        }`}
                                                >
                                                    <span className="flex-1">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <label className="text-[11px] text-[#6b6567]">
                                    تاريخ الاستحقاق
                                </label>
                                <input
                                    type="date"
                                    value={editDueDate}
                                    onChange={(e) => setEditDueDate(e.target.value)}
                                    className="w-full border border-[#e0cfd4] rounded-[12px] px-3 py-2 text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#c87981]"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <label className="text-[11px] text-[#6b6567]">
                                    الساعات التقديرية
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={editHours}
                                    onChange={(e) =>
                                        setEditHours(e.target.value ? Number(e.target.value) : 0)
                                    }
                                    className="w-full border border-[#e0cfd4] rounded-[12px] px-3 py-2 text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#c87981]"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <label className="text-[11px] text-[#6b6567]">
                                    نسبة التقدم (تُحتسب من المهام الفرعية)
                                </label>
                                <div className="text-[12px] text-[#2e2b2c] font-semibold">
                                    {editSubtasks.length > 0
                                        ? `${Math.round(
                                            (editSubtasks.filter((s) => s.completed).length /
                                                editSubtasks.length) *
                                            100
                                        )}%`
                                        : `${editingTask.progress}%`}
                                </div>
                            </div>
                        </div>

                        {/* المهام الفرعية - تعديل / إضافة / حذف */}
                        <div className="space-y-2 mt-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[13px] font-[Cairo] font-semibold text-[#2e2b2c]">
                                    المهام الفرعية
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddSubtask}
                                    className="text-[11px] font-[Cairo] px-3 py-[4px] rounded-full bg-[#e9d5da] text-[#4e2a35]"
                                >
                                    + إضافة مهمة فرعية
                                </button>
                            </div>

                            {editSubtasks.length === 0 ? (
                                <div className="text-[12px] text-[#6b6567] font-[Cairo] bg-[#f3e3e3] rounded-[12px] px-3 py-2 text-right">
                                    لا توجد مهام فرعية، يمكنك إضافة مهام لتحديد التقدم.
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                                    {editSubtasks.map((st) => {
                                        const isEditing = editingSubtaskId === st.id;

                                        return (
                                            <div
                                                key={st.id}
                                                className="flex items-center justify-between bg-[#f3e3e3] rounded-[12px] px-3 py-2 text-[12px] font-[Cairo] gap-2"
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleToggleSubtaskCompleted(st.id)
                                                        }
                                                        className="shrink-0"
                                                    >
                                                        {st.completed ? (
                                                            <Check size={16} className="text-[#1d6b3a]" />
                                                        ) : (
                                                            <Square size={16} className="text-[#a67912]" />
                                                        )}
                                                    </button>

                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={st.title}
                                                            onChange={(e) =>
                                                                handleChangeSubtaskTitle(
                                                                    st.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="عنوان المهمة الفرعية"
                                                            autoFocus
                                                            className={
                                                                "w-full bg-transparent border-none outline-none text-[12px] " +
                                                                (st.completed
                                                                    ? "text-[#6b6567] line-through"
                                                                    : "text-[#2e2b2c]")
                                                            }
                                                        />
                                                    ) : (
                                                        <span
                                                            className={
                                                                "w-full " +
                                                                (st.completed
                                                                    ? "text-[#6b6567] line-through"
                                                                    : "text-[#2e2b2c]")
                                                            }
                                                        >
                                                            {st.title || "مهمة بدون عنوان"}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            isEditing
                                                                ? setEditingSubtaskId(null)
                                                                : setEditingSubtaskId(st.id)
                                                        }
                                                        className="p-1"
                                                    >
                                                        {isEditing ? (
                                                            <Save size={16} className="text-[#1d6b3a]" />
                                                        ) : (
                                                            <Pencil size={16} className="text-[#8d2e46]" />
                                                        )}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSubtask(st.id)}
                                                        className="p-1"
                                                    >
                                                        <Trash2 size={16} className="text-[#8d2e46]" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* الأزرار */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleCloseEditTask}
                                className="px-4 py-2 rounded-[999px] text-[12px] bg-[#f3e3e3] text-[#2e2b2c] font-[Cairo] border border-[#e0cfd4]"
                            >
                                إلغاء
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveTaskChanges}
                                className="px-4 py-2 rounded-[999px] text-[12px] bg-[#8d2e46] text-white font-[Cairo]"
                            >
                                حفظ التغييرات
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

//
// سكشن التقارير
//
interface PerformanceReportsSectionProps {
    tasks: Task[];
    volunteers: Volunteer[];
}

const PerformanceReportsSection: React.FC<PerformanceReportsSectionProps> = ({
    tasks,
    volunteers,
}) => {
    const [activeTab, setActiveTab] = useState<"projects" | "volunteers">(
        "volunteers"
    );
    const [selectedVolunteer, setSelectedVolunteer] = useState<string>("");
    const [isVolunteerSelectOpen, setIsVolunteerSelectOpen] = useState(false);

    const projects = [
        { name: "منصة المتطوعين", progress: 75 },
        { name: "حملة التوعية", progress: 60 },
        { name: "تطوير التطبيق", progress: 40 },
    ];

    // أرقام الأداء من بيانات المتطوع مباشرة
    const volunteersPerformance = volunteers.map((v) => ({
        name: v.name,
        completed: v.completedTasks,
        current: v.currentTasks,
        joinDate: v.joinDate,
    }));

    const selectedVolunteerObj = selectedVolunteer
        ? volunteers.find((v) => v.name === selectedVolunteer) || null
        : null;

    const selectedVolunteerTasks = selectedVolunteerObj
        ? tasks
            .filter((t) => t.volunteerName === selectedVolunteerObj.name)
            .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1))
        : [];

    const selectedPerfRow = selectedVolunteer
        ? volunteersPerformance.find((v) => v.name === selectedVolunteer) || null
        : null;

    return (
        <section dir="rtl" className="w-full space-y-5 mt-6">
            {/* العنوان */}
            <div className="flex justify-center">
                <div className="bg-[#fdf8f9] px-6 py-3 rounded-[18px] shadow-[0px_3px_15px_#8d2e4626]">
                    <h2 className="text-[18px] md:text-[20px] font-[Cairo] font-bold text-[#2e2b2c] text-center">
                        تقارير مفصلة عن أداء المتطوعين والمشاريع
                    </h2>
                </div>
            </div>

            {/* التبويبات */}
            <div className="w-full max-w-[420px] mx-auto bg-[#c87981] rounded-[18px] px-2 py-2 shadow-[0px_3px_15px_#8d2e4626] flex flex-col sm:flex-row sm:flex-row-reverse gap-1 justify-between">
                <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    className={[
                        "w-full sm:flex-1 min-w-0 px-4 py-2 rounded-[14px] text-sm md:text-base font-[Cairo] text-center transition-all duration-150",
                        activeTab === "projects"
                            ? "bg-[#fdf8f9] text-[#2e2b2c] shadow-[0px_2px_8px_#8d2e4680]"
                            : "bg-transparent text-[#fdf8f9]",
                    ].join(" ")}
                >
                    تقدم المشاريع
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("volunteers")}
                    className={[
                        "w-full sm:flex-1 min-w-0 px-4 py-2 rounded-[14px] text-sm md:text-base font-[Cairo] text-center transition-all duration-150",
                        activeTab === "volunteers"
                            ? "bg-[#fdf8f9] text-[#2e2b2c] shadow-[0px_2px_8px_#8d2e4680]"
                            : "bg-transparent text-[#fdf8f9]",
                    ].join(" ")}
                >
                    تفاصيل الأداء
                </button>
            </div>

            {/* حسب التاب */}
            {activeTab === "projects" && (
                <div className="bg-[#fdf8f9] rounded-[18px] shadow-[0px_3px_15px_#8d2e4626] px-5 py-4">
                    <h3 className="text-[15px] font-[Cairo] font-semibold text-[#2e2b2c] mb-3 text-right">
                        تقدم المشاريع
                    </h3>

                    <div className="space-y-3">
                        {projects.map((p) => (
                            <div key={p.name} className="space-y-1">
                                <div className="flex items-center justify-between text-[12px] text-[#4e4a4b] font-[Cairo]">
                                    <span>{p.name}</span>
                                    <span>{p.progress}%</span>
                                </div>
                                <div className="w-full h-[6px] rounded-full bg-[#f0dde2] overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${p.progress}%`,
                                            backgroundColor: "#c87981",
                                            transition: "width 0.3s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "volunteers" && (
                <div className="space-y-4">
                    {/* جدول المتطوعين */}
                    <div className="bg-[#fdf8f9] rounded-[18px] shadow-[0px_3px_15px_#8d2e4626] px-5 py-4 overflow-x-auto">
                        <h3 className="text-[15px] font-[Cairo] font-semibold text-[#2e2b2c] mb-3 text-right">
                            تفاصيل أداء المتطوعين
                        </h3>

                        <table className="min-w-full text-[12px] font-[Cairo] text-right">
                            <thead>
                                <tr className="text-[#6b6567] border-b border-[#e0cfd4]">
                                    <th className="py-2 px-2 font-normal">المتطوع</th>
                                    <th className="py-2 px-2 font-normal">المهام المكتملة</th>
                                    <th className="py-2 px-2 font-normal">المهام الحالية</th>
                                    <th className="py-2 px-2 font-normal">معدل الإنجاز</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteersPerformance.map((v, idx) => {
                                    const total = v.completed + v.current;
                                    const rate =
                                        total === 0 ? 0 : Math.round((v.completed / total) * 100);
                                    return (
                                        <tr
                                            key={v.name}
                                            className={
                                                idx % 2 === 0 ? "bg-[#fdf8f9]" : "bg-[#f6ecef]"
                                            }
                                        >
                                            <td className="py-2 px-2 text-[#2e2b2c]">{v.name}</td>
                                            <td className="py-2 px-2 text-[#2e2b2c]">
                                                {v.completed}
                                            </td>
                                            <td className="py-2 px-2 text-[#2e2b2c]">
                                                {v.current}
                                            </td>
                                            <td className="py-2 px-2">
                                                <div className="flex flex-row-reverse items-center gap-2">
                                                    <div className="w-full h-[5px] rounded-full bg-[#f0dde2] overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${rate}%`,
                                                                backgroundColor: "#c87981",
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-[#2e2b2c] min-w-[32px] text-right">
                                                        {rate}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* اختيار متطوع + التقرير الفردي */}
                    <div className="space-y-3">
                        {/* الدروب ليست على اليسار */}
                        <div className="flex justify-end">
                            <div className="relative w-full max-w-[220px] text-right">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsVolunteerSelectOpen((prev) => !prev)
                                    }
                                    className="w-full h-[40px] rounded-[18px] border border-[#e0cfd4] bg-[#fdf8f9] px-4 pr-4 pl-8 text-[13px] text-[#2e2b2c] font-[Cairo] flex items-center justify-between text-right"
                                >
                                    <span className="flex-1 text-right">
                                        {selectedVolunteer || "اختر متطوع"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-[#8d2e46]" />
                                </button>

                                {isVolunteerSelectOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-[12px] bg-white shadow-[0px_8px_20px_#00000026] border border-[#e0cfd4] overflow-hidden text-[13px] max-h-[220px] overflow-y-auto custom-scrollbar">
                                        {volunteersPerformance.map((v) => (
                                            <button
                                                key={v.name}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedVolunteer(v.name);
                                                    setIsVolunteerSelectOpen(false);
                                                }}
                                                className={`w-full text-right px-4 py-2 hover:bg-[#fdf1f4] ${selectedVolunteer === v.name
                                                        ? "bg-[#f3e3e8]"
                                                        : ""
                                                    }`}
                                            >
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-[#fdf8f9] rounded-[18px] shadow-[0px_3px_15px_#8d2e4626] px-4 sm:px-6 py-6 sm:py-8 text-right">
                            {selectedVolunteerObj && selectedPerfRow ? (
                                <div className="w-full">
                                    <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 text-right">
                                        {/* يمين: معلومات عامة */}
                                        <div className="w-full md:w-[40%] rounded-xl bg-white/60 p-3 sm:p-4 flex flex-col text-right space-y-2">
                                            <div className="text-[15px] font-[Cairo] font-bold text-[#2e2b2c]">
                                                تقرير فردي - {selectedVolunteerObj.name}
                                            </div>
                                            <div className="text-[12px] text-[#6b6567] font-[Cairo]">
                                                {selectedVolunteerObj.skills[0] || "متطوع"}
                                            </div>

                                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-[12px] font-[Cairo]">
                                                <div className="rounded-lg border border-[#ecd8dd] bg-white px-3 py-2 space-y-1">
                                                    <span className="block text-[#6b6567] text-right">
                                                        تاريخ الانضمام
                                                    </span>
                                                    <span className="block text-[13px] font-semibold text-[#2e2b2c] text-right">
                                                        {selectedPerfRow.joinDate}
                                                    </span>
                                                </div>
                                                <div className="rounded-lg border border-[#ecd8dd] bg-white px-3 py-2 space-y-1">
                                                    <span className="block text-[#6b6567] text-right">
                                                        المهام المكتملة
                                                    </span>
                                                    <span className="block text-[13px] font-semibold text-[#2e2b2c] text-right">
                                                        {selectedPerfRow.completed}
                                                    </span>
                                                </div>
                                                <div className="rounded-lg border border-[#ecd8dd] bg-white px-3 py-2 space-y-1 sm:col-span-2 md:col-span-1">
                                                    <span className="block text-[#6b6567] text-right">
                                                        المهام الحالية
                                                    </span>
                                                    <span className="block text-[13px] font-semibold text-[#2e2b2c] text-right">
                                                        {selectedPerfRow.current}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* يسار: المهام الأخيرة */}
                                        <div className="w-full md:w-[60%] rounded-xl bg-white/50 p-3 sm:p-4 flex flex-col gap-3 text-right">
                                            <div className="text-[14px] font-[Cairo] font-semibold text-[#2e2b2c] text-right">
                                                المهام الأخيرة
                                            </div>
                                            <div className="space-y-2 text-[12px] font-[Cairo]">
                                                {selectedVolunteerTasks.length === 0 ? (
                                                    <div className="text-center text-[#c2b5b9]">
                                                        لا توجد مهام مسندة حاليًا لهذا المتطوع.
                                                    </div>
                                                ) : (
                                                    selectedVolunteerTasks.map((t) => (
                                                        <div
                                                            key={t.id}
                                                            className="w-full rounded-lg border border-[#ecd8dd] bg-white px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3"
                                                        >
                                                            <span className="text-[#6b6567] text-right shrink-0">
                                                                {t.dueDate}
                                                            </span>
                                                            <div className="w-full sm:flex-1 text-right text-[#2e2b2c]">
                                                                {t.title}
                                                            </div>
                                                            <span
                                                                className={[
                                                                    "px-3 py-[3px] rounded-full text-[11px]",
                                                                    getStatusClasses(t.status),
                                                                ].join(" ")}
                                                            >
                                                                {t.status}
                                                            </span>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 text-center font-[Cairo]">
                                    <User size={38} className="text-[#c2b5b9]" />
                                    <div className="text-[#c2b5b9] text-[14px]">
                                        اختر متطوعًا لعرض تقريره الفردي
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

//
// الصفحة الرئيسية
//
const VolunteerManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [volunteers] = useState<Volunteer[]>(initialVolunteers);

    const term = searchTerm.trim().toLowerCase();

    const filteredVolunteers = volunteers.filter((v) => {
        if (!term) return true;
        const haystack = (
            v.name +
            " " +
            v.email +
            " " +
            v.phone +
            " " +
            v.location +
            " " +
            v.skills.join(" ")
        ).toLowerCase();
        return haystack.includes(term);
    });

    const filteredTasks = tasks.filter((t) => {
        if (!term) return true;
        const haystack = (
            t.title +
            " " +
            t.project +
            " " +
            t.volunteerName +
            " " +
            t.status +
            " " +
            t.priority
        ).toLowerCase();
        return haystack.includes(term);
    });

    return (
            <section dir="rtl" className="space-y-8">
                {/* البحث */}
                <div dir="ltr" className="flex justify-start">
                    <div className="relative w-full max-w-[321px] h-[42px]">
                        <div className="absolute inset-0 bg-[#faf6f76b] rounded-[20px] shadow-[inset_0px_0px_8px_#f3e3e3e0,0px_4px_15px_#8d2e4682]" />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="البحث عن متطوع او مهارة...."
                            className="absolute inset-0 w-full h-full bg-transparent border-none outline-none pl-10 pr-3 text-[15px] text-[#4e4a4b] [direction:rtl] font-[Cairo]"
                        />

                        <div className="absolute top-1/2 -translate-y-1/2 left-[10px]">
                            <FiSearch className="w-[16px] h-[16px] text-[#4e4a4b]" />
                        </div>
                    </div>
                </div>

                <ProjectOverviewSection />
                <TasksVolunteersTabs
                    tasks={filteredTasks}
                    setTasks={setTasks}
                    volunteers={filteredVolunteers}
                />
                <PerformanceReportsSection
                    tasks={filteredTasks}
                    volunteers={filteredVolunteers}
                />
            </section>
    );
};

export default VolunteerManagement;
