import { Course } from '@/types';

// デモ用学科データ
export const DEPARTMENTS = [
  '情報工学科',
  '電気電子工学科',
  '機械工学科',
  '経営工学科'
];

// デモ用教室データ
export const CLASSROOMS = [
  'A101', 'A102', 'A201', 'A202',
  'B101', 'B102', 'B201', 'B202',
  'PC室1', 'PC室2', '実験室1', '実験室2'
];

// デモ授業データ（50科目）
export const DEMO_COURSES: Course[] = [
  // 必修科目（情報工学科）
  {
    id: 'cs101',
    code: 'CS101',
    name: '計算機科学入門',
    credits: 2,
    type: 'required',
    instructor: '山田太郎',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 1, period: 2, room: 'A101' }
    ]
  },
  {
    id: 'math101',
    code: 'MATH101',
    name: '線形代数学',
    credits: 2,
    type: 'required',
    instructor: '鈴木花子',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 2, period: 1, room: 'B201' },
      { day: 4, period: 3, room: 'B202' }
    ]
  },
  {
    id: 'cs102',
    code: 'CS102',
    name: 'プログラミング基礎',
    credits: 2,
    type: 'required',
    instructor: '佐藤一郎',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 1, period: 3, room: 'PC室1' },
      { day: 3, period: 2, room: 'PC室1' }
    ]
  },
  {
    id: 'math102',
    code: 'MATH102',
    name: '微分積分学',
    credits: 2,
    type: 'required',
    instructor: '田中美智子',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 3, period: 1, room: 'A201' }
    ]
  },
  {
    id: 'eng101',
    code: 'ENG101',
    name: '技術英語I',
    credits: 1,
    type: 'required',
    instructor: 'Smith John',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 5, period: 2, room: 'A102' }
    ]
  },
  
  // 選択科目（情報工学科）
  {
    id: 'cs201',
    code: 'CS201',
    name: 'データ構造とアルゴリズム',
    credits: 2,
    type: 'elective',
    instructor: '伊藤健二',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 2, period: 3, room: 'A201' },
      { day: 4, period: 2, room: 'A201' }
    ]
  },
  {
    id: 'cs202',
    code: 'CS202',
    name: 'オブジェクト指向プログラミング',
    credits: 2,
    type: 'elective',
    instructor: '渡辺修',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 1, period: 4, room: 'PC室2' }
    ]
  },
  {
    id: 'cs203',
    code: 'CS203',
    name: 'データベース工学',
    credits: 2,
    type: 'elective',
    instructor: '高橋直樹',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 3, period: 3, room: 'B101' }
    ]
  },
  {
    id: 'cs204',
    code: 'CS204',
    name: 'コンピュータネットワーク',
    credits: 2,
    type: 'elective',
    instructor: '松本優子',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 2, period: 4, room: 'B102' }
    ]
  },
  {
    id: 'cs205',
    code: 'CS205',
    name: 'Web開発実践',
    credits: 2,
    type: 'elective',
    instructor: '青木翔',
    department: '情報工学科',
    difficulty: 'easy',
    schedules: [
      { day: 4, period: 4, room: 'PC室2' }
    ]
  },
  {
    id: 'cs206',
    code: 'CS206',
    name: '人工知能基礎',
    credits: 2,
    type: 'elective',
    instructor: '黒田智子',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 5, period: 3, room: 'A202' }
    ]
  },
  {
    id: 'cs207',
    code: 'CS207',
    name: '機械学習入門',
    credits: 2,
    type: 'elective',
    instructor: '白石健太',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 1, period: 5, room: 'B201' }
    ]
  },
  {
    id: 'cs208',
    code: 'CS208',
    name: 'ソフトウェア工学',
    credits: 2,
    type: 'elective',
    instructor: '緑川明美',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 3, period: 4, room: 'A102' }
    ]
  },
  {
    id: 'cs209',
    code: 'CS209',
    name: 'セキュリティ工学',
    credits: 2,
    type: 'elective',
    instructor: '紫田剛',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 2, period: 5, room: 'B202' }
    ]
  },
  {
    id: 'cs210',
    code: 'CS210',
    name: 'モバイルアプリ開発',
    credits: 2,
    type: 'elective',
    instructor: '橙本誠',
    department: '情報工学科',
    difficulty: 'easy',
    schedules: [
      { day: 4, period: 5, room: 'PC室1' }
    ]
  },
  
  // 一般教養科目
  {
    id: 'lib101',
    code: 'LIB101',
    name: '哲学入門',
    credits: 2,
    type: 'elective',
    instructor: '灰田哲夫',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 1, period: 1, room: 'A101' }
    ]
  },
  {
    id: 'lib102',
    code: 'LIB102',
    name: '心理学概論',
    credits: 2,
    type: 'elective',
    instructor: '桃井さくら',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 3, period: 5, room: 'A202' }
    ]
  },
  {
    id: 'lib103',
    code: 'LIB103',
    name: '経済学入門',
    credits: 2,
    type: 'elective',
    instructor: '金田富男',
    department: '一般教養',
    difficulty: 'normal',
    schedules: [
      { day: 2, period: 2, room: 'B101' }
    ]
  },
  {
    id: 'lib104',
    code: 'LIB104',
    name: '統計学基礎',
    credits: 2,
    type: 'elective',
    instructor: '銀山統計',
    department: '一般教養',
    difficulty: 'normal',
    schedules: [
      { day: 5, period: 1, room: 'B102' }
    ]
  },
  {
    id: 'lib105',
    code: 'LIB105',
    name: '現代社会論',
    credits: 2,
    type: 'elective',
    instructor: '銅谷社会',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 4, period: 1, room: 'A101' }
    ]
  },
  
  // 電気電子工学科科目
  {
    id: 'ee101',
    code: 'EE101',
    name: '電気回路基礎',
    credits: 2,
    type: 'required',
    instructor: '電田光男',
    department: '電気電子工学科',
    difficulty: 'normal',
    schedules: [
      { day: 1, period: 2, room: 'B201' }
    ]
  },
  {
    id: 'ee102',
    code: 'EE102',
    name: 'デジタル回路',
    credits: 2,
    type: 'required',
    instructor: '回路花子',
    department: '電気電子工学科',
    difficulty: 'normal',
    schedules: [
      { day: 3, period: 3, room: '実験室1' }
    ]
  },
  {
    id: 'ee201',
    code: 'EE201',
    name: '電子工学',
    credits: 2,
    type: 'elective',
    instructor: '電子太郎',
    department: '電気電子工学科',
    difficulty: 'hard',
    schedules: [
      { day: 2, period: 4, room: '実験室2' }
    ]
  },
  {
    id: 'ee202',
    code: 'EE202',
    name: '制御工学',
    credits: 2,
    type: 'elective',
    instructor: '制御一郎',
    department: '電気電子工学科',
    difficulty: 'hard',
    schedules: [
      { day: 5, period: 4, room: 'B202' }
    ]
  },
  {
    id: 'ee203',
    code: 'EE203',
    name: '電磁気学',
    credits: 2,
    type: 'elective',
    instructor: '磁場次郎',
    department: '電気電子工学科',
    difficulty: 'hard',
    schedules: [
      { day: 1, period: 6, room: 'A201' }
    ]
  },
  
  // 機械工学科科目
  {
    id: 'me101',
    code: 'ME101',
    name: '機械工学入門',
    credits: 2,
    type: 'required',
    instructor: '機械太郎',
    department: '機械工学科',
    difficulty: 'normal',
    schedules: [
      { day: 2, period: 1, room: 'A102' }
    ]
  },
  {
    id: 'me102',
    code: 'ME102',
    name: '材料力学',
    credits: 2,
    type: 'required',
    instructor: '材料花子',
    department: '機械工学科',
    difficulty: 'hard',
    schedules: [
      { day: 4, period: 2, room: 'B101' }
    ]
  },
  {
    id: 'me201',
    code: 'ME201',
    name: '流体力学',
    credits: 2,
    type: 'elective',
    instructor: '流体一郎',
    department: '機械工学科',
    difficulty: 'hard',
    schedules: [
      { day: 3, period: 6, room: '実験室1' }
    ]
  },
  {
    id: 'me202',
    code: 'ME202',
    name: '熱力学',
    credits: 2,
    type: 'elective',
    instructor: '熱田暖男',
    department: '機械工学科',
    difficulty: 'hard',
    schedules: [
      { day: 5, period: 5, room: 'A202' }
    ]
  },
  {
    id: 'me203',
    code: 'ME203',
    name: 'CAD実習',
    credits: 1,
    type: 'elective',
    instructor: 'CAD子',
    department: '機械工学科',
    difficulty: 'easy',
    schedules: [
      { day: 1, period: 4, room: 'PC室2' }
    ]
  },
  
  // 経営工学科科目
  {
    id: 'ie101',
    code: 'IE101',
    name: '経営学概論',
    credits: 2,
    type: 'required',
    instructor: '経営太郎',
    department: '経営工学科',
    difficulty: 'normal',
    schedules: [
      { day: 3, period: 2, room: 'A101' }
    ]
  },
  {
    id: 'ie102',
    code: 'IE102',
    name: 'オペレーションズリサーチ',
    credits: 2,
    type: 'required',
    instructor: 'OR花子',
    department: '経営工学科',
    difficulty: 'hard',
    schedules: [
      { day: 5, period: 3, room: 'B101' }
    ]
  },
  {
    id: 'ie201',
    code: 'IE201',
    name: '品質管理',
    credits: 2,
    type: 'elective',
    instructor: '品質一郎',
    department: '経営工学科',
    difficulty: 'normal',
    schedules: [
      { day: 2, period: 6, room: 'B102' }
    ]
  },
  {
    id: 'ie202',
    code: 'IE202',
    name: '生産管理',
    credits: 2,
    type: 'elective',
    instructor: '生産次郎',
    department: '経営工学科',
    difficulty: 'normal',
    schedules: [
      { day: 4, period: 6, room: 'A102' }
    ]
  },
  {
    id: 'ie203',
    code: 'IE203',
    name: 'マーケティング論',
    credits: 2,
    type: 'elective',
    instructor: '市場三郎',
    department: '経営工学科',
    difficulty: 'easy',
    schedules: [
      { day: 1, period: 3, room: 'B202' }
    ]
  },
  
  // 追加の選択科目
  {
    id: 'cs211',
    code: 'CS211',
    name: 'ゲーム開発入門',
    credits: 2,
    type: 'elective',
    instructor: 'ゲーム太郎',
    department: '情報工学科',
    difficulty: 'easy',
    schedules: [
      { day: 3, period: 5, room: 'PC室1' }
    ]
  },
  {
    id: 'cs212',
    code: 'CS212',
    name: 'ビッグデータ解析',
    credits: 2,
    type: 'elective',
    instructor: 'データ花子',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 2, period: 3, room: 'PC室2' }
    ]
  },
  {
    id: 'cs213',
    code: 'CS213',
    name: 'クラウドコンピューティング',
    credits: 2,
    type: 'elective',
    instructor: 'クラウド一郎',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 4, period: 3, room: 'A201' }
    ]
  },
  {
    id: 'cs214',
    code: 'CS214',
    name: 'IoT実践',
    credits: 2,
    type: 'elective',
    instructor: 'IoT子',
    department: '情報工学科',
    difficulty: 'normal',
    schedules: [
      { day: 5, period: 6, room: '実験室2' }
    ]
  },
  {
    id: 'lib106',
    code: 'LIB106',
    name: '環境科学',
    credits: 2,
    type: 'elective',
    instructor: '環境守',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 1, period: 5, room: 'A102' }
    ]
  },
  {
    id: 'lib107',
    code: 'LIB107',
    name: '日本文化論',
    credits: 2,
    type: 'elective',
    instructor: '文化愛子',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 3, period: 1, room: 'B101' }
    ]
  },
  {
    id: 'lib108',
    code: 'LIB108',
    name: 'スポーツ科学',
    credits: 1,
    type: 'elective',
    instructor: '運動健太',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 2, period: 6, room: 'A202' }
    ]
  },
  {
    id: 'lib109',
    code: 'LIB109',
    name: '芸術概論',
    credits: 2,
    type: 'elective',
    instructor: '芸術美術',
    department: '一般教養',
    difficulty: 'easy',
    schedules: [
      { day: 5, period: 5, room: 'B201' }
    ]
  },
  {
    id: 'lib110',
    code: 'LIB110',
    name: '国際関係論',
    credits: 2,
    type: 'elective',
    instructor: '国際平和',
    department: '一般教養',
    difficulty: 'normal',
    schedules: [
      { day: 4, period: 4, room: 'A101' }
    ]
  },
  {
    id: 'eng102',
    code: 'ENG102',
    name: '技術英語II',
    credits: 1,
    type: 'elective',
    instructor: 'Johnson Mary',
    department: '一般教養',
    difficulty: 'normal',
    schedules: [
      { day: 1, period: 6, room: 'B102' }
    ]
  },
  {
    id: 'eng103',
    code: 'ENG103',
    name: 'ビジネス英語',
    credits: 1,
    type: 'elective',
    instructor: 'Brown David',
    department: '一般教養',
    difficulty: 'normal',
    schedules: [
      { day: 3, period: 6, room: 'A201' }
    ]
  },
  {
    id: 'math201',
    code: 'MATH201',
    name: '応用数学',
    credits: 2,
    type: 'elective',
    instructor: '数学応用',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 2, period: 2, room: 'A202' }
    ]
  },
  {
    id: 'math202',
    code: 'MATH202',
    name: '確率統計',
    credits: 2,
    type: 'elective',
    instructor: '確率論子',
    department: '情報工学科',
    difficulty: 'hard',
    schedules: [
      { day: 5, period: 1, room: 'B201' }
    ]
  },
  {
    id: 'phys101',
    code: 'PHYS101',
    name: '物理学基礎',
    credits: 2,
    type: 'elective',
    instructor: '物理太郎',
    department: '一般教養',
    difficulty: 'normal',
    schedules: [
      { day: 4, period: 5, room: '実験室1' }
    ]
  }
];