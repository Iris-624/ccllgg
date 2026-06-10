const categories = [
  { key: "neuroPhysiology", label: "神经生理", hint: "信号 / 图像 / 质量" },
  { key: "algorithmModel", label: "算法模型", hint: "模型 / 版本 / 指标" },
  { key: "userBehavior", label: "用户行为", hint: "任务 / 点击 / 日志" },
  { key: "trainingConfig", label: "训练配置", hint: "范式 / 参数 / 配置" },
  { key: "personalInfo", label: "患者信息", hint: "资料 / 医院 / 访视" },
  { key: "deviceManagement", label: "设备异常", hint: "设备 / 状态 / 维护" }
];

const records = {
  neuroPhysiology: [
    makeRecord("0001", "医院 A", "术后1个月", "12 条", "已完成", "神经生理采集", "2026-05-10 19:30 - 20:10", "Raw Data"),
    makeRecord("0111", "医院 B", "术后2个月", "8 条", "已完成", "神经信号质量", "2026-05-10 20:15 - 20:42", "RMS"),
    makeRecord("0123", "医院 A", "术后3个月", "5 条", "待复核", "频谱分析", "2026-05-09 18:20 - 18:55", "频谱图")
  ],
  algorithmModel: [
    makeRecord("0001", "医院 A", "术后1个月", "4 个模型", "可用", "Decoder 模型", "2026-05-10 21:00 - 21:30", "模型评估"),
    makeRecord("0111", "医院 B", "术后2个月", "3 个模型", "可用", "Classifier 模型", "2026-05-09 18:00 - 18:35", "训练结果"),
    makeRecord("0123", "医院 A", "术后3个月", "2 个模型", "待确认", "Calibration 模型", "2026-05-08 16:00 - 16:25", "校准参数")
  ],
  userBehavior: [
    makeRecord("0001", "医院 A", "术后1个月", "8 个 Session", "已完成", "Combo Session", "2026-05-10 19:56 - 20:08", "行为日志"),
    makeRecord("0111", "医院 B", "术后2个月", "6 个 Session", "已完成", "Keyboard Session", "2026-05-10 20:18 - 20:30", "点击记录"),
    makeRecord("0123", "医院 A", "术后3个月", "4 个 Session", "已完成", "Mechanical Arm", "2026-05-10 20:44 - 20:58", "任务指标")
  ],
  trainingConfig: [
    makeRecord("0001", "医院 A", "术后1个月", "3 套配置", "启用", "Combo 训练范式", "2026-05-10 09:00 - 09:10", "训练配置"),
    makeRecord("0111", "医院 B", "术后2个月", "2 套配置", "启用", "轮椅控制映射", "2026-05-10 09:30 - 09:42", "设备映射"),
    makeRecord("0123", "医院 A", "术后3个月", "2 套配置", "停用", "阈值参数", "2026-05-09 10:00 - 10:12", "参数版本")
  ],
  personalInfo: [
    makeRecord("0001", "医院 A", "术后1个月", "1 份档案", "有效", "基础资料", "2026-05-10", "个人档案"),
    makeRecord("0111", "医院 B", "术后2个月", "1 份档案", "有效", "医院信息", "2026-05-09", "机构资料"),
    makeRecord("0123", "医院 A", "术后3个月", "1 份档案", "进行中", "访视节点", "2026-05-08", "访视信息")
  ],
  deviceManagement: [
    makeRecord("0001", "医院 A", "术后1个月", "5 次记录", "正常", "供电体连接", "2026-05-10 19:00 - 20:30", "设备状态"),
    makeRecord("0111", "医院 B", "术后2个月", "4 次记录", "正常", "植入体连接", "2026-05-10 19:02 - 20:25", "连接状态"),
    makeRecord("0123", "医院 A", "术后3个月", "3 次记录", "已记录", "系统连接时长", "2026-05-10 19:00 - 20:12", "使用时长")
  ]
};

const extraSubjects = [
  ["0201", "医院 B", "术后4个月", "10 条", "已完成"],
  ["0208", "医院 C", "术后5个月", "7 条", "待复核"],
  ["0310", "医院 A", "术后6个月", "14 条", "已完成"],
  ["0412", "医院 C", "出院访视", "6 条", "进行中"],
  ["0506", "医院 B", "手术当天", "9 条", "已完成"],
  ["0618", "医院 A", "术后1个月", "11 条", "待确认"],
  ["0722", "医院 C", "术后2个月", "4 条", "已记录"],
  ["0830", "医院 B", "术后3个月", "13 条", "已完成"]
];

Object.entries(records).forEach(([categoryKey, list]) => {
  const base = list[0];
  extraSubjects.forEach(([subjectId, hospital, postOpTime, count, status], index) => {
    list.push(makeRecord(
      subjectId,
      hospital,
      postOpTime,
      count.replace("条", base.availableCount.includes("模型") ? "个模型" : base.availableCount.includes("Session") ? "个 Session" : base.availableCount.includes("配置") ? "套配置" : base.availableCount.includes("档案") ? "份档案" : base.availableCount.includes("记录") ? "次记录" : "条"),
      status,
      `${base.recordType}-${index + 1}`,
      `2026-05-${String(11 + index).padStart(2, "0")} 09:00 - 10:00`,
      base.dataType
    ));
  });
});

function makeRecord(subjectId, hospital, postOpTime, availableCount, status, recordType, timeRange, dataType) {
  const profile = {
    "0001": { ageGroup: "18-35岁", gender: "男", implantLocation: "左侧运动皮层" },
    "0111": { ageGroup: "36-55岁", gender: "女", implantLocation: "右侧运动皮层" },
    "0123": { ageGroup: "56岁以上", gender: "男", implantLocation: "双侧运动皮层" }
  }[subjectId] || { ageGroup: "未知", gender: "未知", implantLocation: "未知" };

  return {
    subjectId,
    hospital,
    postOpTime,
    ageGroup: profile.ageGroup,
    gender: profile.gender,
    implantLocation: profile.implantLocation,
    recordDate: timeRange.slice(0, 10),
    dateRange: formatDateRange(timeRange.slice(0, 10)),
    availableCount,
    status,
    recordType,
    timeRange,
    dataType,
    dataRows: []
  };
}

function formatDateRange(startDate) {
  const date = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return startDate;
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 2);
  return `${startDate} 至 ${endDate.toISOString().slice(0, 10)}`;
}

const detailDataCatalog = {
  neuroPhysiology: [
    ["Raw信号", "采样完整率 98.20%"],
    ["各式神经数据（bincount/sbp）", "数据包 24 组"]
  ],
  algorithmModel: [
    ["模型数据", "当前版本 v2.1"]
  ],
  userBehavior: [
    ["脑控成功率", "100.00%"],
    ["脑控流畅度指标", "80.00 bits/min"],
    ["任务清单准确率", "100.00%"],
    ["器械可靠性", "238 通道"],
    ["平均每月器械使用时长", "42.50 h"],
    ["轮椅移动距离&时长", "120.00 m / 35.00 min"],
    ["机械臂任务成功个数", "6.00 次"]
  ],
  trainingConfig: [
    ["卡片配置策略", "已启用"],
    ["映射配置策略", "已启用"],
    ["训练策略", "v3.2"],
    ["校准策略", "最近校准 2026-05-10"]
  ],
  personalInfo: [
    ["年龄", "32 岁"],
    ["性别", "男"],
    ["手术记录", "已归档"],
    ["植入定位信息", "已确认"]
  ],
  deviceManagement: [
    ["主板电压（x100）", "330"],
    ["主板电流", "120 mA"],
    ["主板温度(NTC3)", "36.8 ℃"],
    ["SHT45_1温度", "27.1 ℃"],
    ["SHT45_1湿度", "48.2 %"],
    ["SHT45_2温度", "27.4 ℃"],
    ["SHT45_2湿度", "49.0 %"],
    ["WF280A气压", "101.2 kPa"],
    ["WF280A温度", "26.9 ℃"]
  ]
};

const state = {
  activeCategory: "neuroPhysiology",
  mode: "list",
  selectedRecord: null,
  search: "",
  detailDataType: "all",
  detailDateRange: {
    start: "",
    end: ""
  },
  detailPostOpMonth: "1",
  selectedDetailRows: [],
  expandedDataRow: "",
  filters: {
    subjectId: "all",
    hospital: "all",
    ageGroup: "all",
    gender: "all",
    postOpTime: "all",
    implantLocation: "all"
  }
};

const el = {
  loginScreen: document.getElementById("loginScreen"),
  appShell: document.getElementById("appShell"),
  accountInput: document.getElementById("accountInput"),
  passwordInput: document.getElementById("passwordInput"),
  loginError: document.getElementById("loginError"),
  loginSubmitButton: document.getElementById("loginSubmitButton"),
  searchInput: document.getElementById("globalSearchInput"),
  exportHistoryButton: document.getElementById("exportHistoryButton"),
  categoryList: document.getElementById("categoryList"),
  contentTitle: document.getElementById("contentTitle"),
  contentBody: document.getElementById("contentBody"),
  backButton: document.getElementById("backButton"),
  refreshButton: document.getElementById("refreshButton"),
  toast: document.getElementById("toast")
};

function activeCategory() {
  return categories.find((item) => item.key === state.activeCategory);
}

function filteredRecords() {
  const keyword = state.search.trim().toLowerCase();
  const source = records[state.activeCategory] || [];
  return source.filter((record) => {
    const keywordMatched = !keyword || [
      record.subjectId,
      record.hospital,
      record.ageGroup,
      record.gender,
      record.postOpTime,
      record.implantLocation,
      record.availableCount,
      record.status,
      record.recordType
    ].join(" ").toLowerCase().includes(keyword);

    const subjectMatched = state.filters.subjectId === "all" || record.subjectId === state.filters.subjectId;
    const hospitalMatched = state.filters.hospital === "all" || record.hospital === state.filters.hospital;
    const ageMatched = state.filters.ageGroup === "all" || record.ageGroup === state.filters.ageGroup;
    const genderMatched = state.filters.gender === "all" || record.gender === state.filters.gender;
    const implantMatched = ["algorithmModel", "deviceManagement"].includes(state.activeCategory) || state.filters.implantLocation === "all" || record.implantLocation === state.filters.implantLocation;
    const postOpMatched = !["algorithmModel", "trainingConfig"].includes(state.activeCategory) || state.filters.postOpTime === "all" || record.postOpTime === state.filters.postOpTime;
    return keywordMatched && subjectMatched && hospitalMatched && ageMatched && genderMatched && implantMatched && postOpMatched;
  });
}

function render() {
  renderCategoryNav();
  renderContent();
}

function renderCategoryNav() {
  el.categoryList.innerHTML = categories.map((item) => `
    <button class="category-button ${item.key === state.activeCategory ? "active" : ""}" data-category="${item.key}">
      <span>${item.label}</span>
    </button>
  `).join("");
}

function renderContent() {
  const category = activeCategory();
  el.contentTitle.textContent = state.mode === "exports" ? "导出记录" : category.label;
  el.backButton.classList.toggle("hidden", !["detail", "exports"].includes(state.mode));

  if (state.mode === "exports") {
    renderFilterBar(false);
    renderExportHistory();
    return;
  }

  if (state.mode === "detail") {
    renderFilterBar(false);
    renderDetail();
    return;
  }

  renderFilterBar(true);
  renderRecordList();
}

function renderFilterBar(visible) {
  let filterBar = document.getElementById("filterBar");
  if (!visible) {
    if (filterBar) filterBar.remove();
    return;
  }

  const options = collectFilterOptions(records[state.activeCategory] || []);
  const showImplantFilter = !["algorithmModel", "deviceManagement"].includes(state.activeCategory);
  const showAlgorithmPostOpFilter = state.activeCategory === "algorithmModel";
  const showPostOpStageFilter = state.activeCategory === "trainingConfig";
  const html = `
    <div class="filter-bar ${filterBarLayoutClass(showImplantFilter, showPostOpStageFilter, showAlgorithmPostOpFilter)}" id="filterBar">
      <label><span>年龄段</span>${selectHtml("ageGroup", ["all", ...options.ageGroups], state.filters.ageGroup, "全部年龄")}</label>
      <label><span>性别</span>${selectHtml("gender", ["all", ...options.genders], state.filters.gender, "全部性别")}</label>
      <label><span>医院</span>${selectHtml("hospital", ["all", ...options.hospitals], state.filters.hospital, "全部医院")}</label>
      ${showAlgorithmPostOpFilter ? `<label><span>术后时间</span>${selectHtml("postOpTime", postOpStageOptions(), state.filters.postOpTime, "全部时间")}</label>` : ""}
      ${showPostOpStageFilter ? `<label><span>术后阶段</span>${selectHtml("postOpTime", postOpStageOptions(), state.filters.postOpTime, "全部阶段")}</label>` : ""}
      ${showImplantFilter ? `<label><span>植入位置</span>${selectHtml("implantLocation", ["all", ...options.implantLocations], state.filters.implantLocation, "全部位置")}</label>` : ""}
    </div>
  `;

  if (filterBar) {
    filterBar.outerHTML = html;
    return;
  }
  document.querySelector(".content-header").insertAdjacentHTML("afterend", html);
}

function filterBarLayoutClass(showImplantFilter, showPostOpStageFilter, showAlgorithmPostOpFilter) {
  const count = 3 + (showImplantFilter ? 1 : 0) + (showPostOpStageFilter ? 1 : 0) + (showAlgorithmPostOpFilter ? 1 : 0);
  if (count === 5) return "filter-bar-five";
  if (count === 3) return "filter-bar-three";
  return "";
}

function postOpStageOptions() {
  return ["all", "术后1个月", "术后2个月", "术后3个月", "术后4个月", "术后5个月", "术后6个月"];
}

function collectFilterOptions(list) {
  return {
    subjectIds: unique(list.map((record) => record.subjectId)),
    hospitals: unique(list.map((record) => record.hospital)),
    ageGroups: unique(list.map((record) => record.ageGroup)),
    genders: unique(list.map((record) => record.gender)),
    implantLocations: unique(list.map((record) => record.implantLocation))
  };
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function selectHtml(name, values, current, allLabel) {
  return `
    <select data-filter="${name}">
      ${values.map((value) => `<option value="${value}" ${value === current ? "selected" : ""}>${value === "all" ? allLabel : value}</option>`).join("")}
    </select>
  `;
}

function renderRecordList() {
  const list = filteredRecords();
  const isDeviceList = state.activeCategory === "deviceManagement";
  const isPersonalList = state.activeCategory === "personalInfo";
  const isAlgorithmList = state.activeCategory === "algorithmModel";
  const metricOneLabel = state.activeCategory === "userBehavior" ? "脑控流畅度" : state.activeCategory === "neuroPhysiology" ? "信号质量" : state.activeCategory === "trainingConfig" ? "映射配置" : "指标1";
  const metricTwoLabel = state.activeCategory === "userBehavior" ? "器械可靠性" : state.activeCategory === "trainingConfig" ? "卡片配置" : "指标2";
  if (!list.length) {
    el.contentBody.innerHTML = `
      <div class="empty-state">
        <div>
          <strong>暂无匹配记录</strong>
          <p>请调整搜索关键词或切换左侧分类。</p>
        </div>
      </div>
    `;
    return;
  }

  if (isDeviceList) {
    renderDeviceRecordList(list);
    return;
  }

  if (isPersonalList) {
    renderPersonalInfoRecordList(list);
    return;
  }

  if (isAlgorithmList) {
    renderAlgorithmRecordList(list);
    return;
  }

  if (state.activeCategory === "trainingConfig") {
    renderTrainingConfigRecordList(list);
    return;
  }

  if (state.activeCategory === "neuroPhysiology") {
    renderNeuroRecordList(list);
    return;
  }

  el.contentBody.innerHTML = `
    <div class="record-list-shell">
      <div class="record-list-header">
        <span>编号</span>
        <span>性别</span>
        <span>医院</span>
        <span>术后时间</span>
        <span>${metricOneLabel}</span>
        <span>${metricTwoLabel}</span>
        <span>操作</span>
      </div>
      <div class="record-list">
      ${list.map((record, index) => `
        <article class="record-card">
          <div class="record-field"><span>编号</span><strong>${record.subjectId}</strong></div>
          <div class="record-field"><span>性别</span><strong>${record.gender}</strong></div>
          <div class="record-field"><span>医院</span><strong>${record.hospital}</strong></div>
          <div class="record-field"><span>术后时间</span><strong>${record.postOpTime}</strong></div>
          <div class="record-field"><span>${metricOneLabel}</span><strong>${metricOneValue(record, index)}</strong></div>
          <div class="record-field"><span>${metricTwoLabel}</span><strong>${metricTwoValue(record, index)}</strong></div>
          <button class="link-button" data-detail="${index}">详情</button>
        </article>
      `).join("")}
      </div>
    </div>
  `;
}

function renderNeuroRecordList(list) {
  const imageTypes = neuroImageTypes();
  el.contentBody.innerHTML = `
    <div class="record-list-shell neuro-record-list-shell">
      <div class="record-list-header neuro-record-list-header">
        <span>编号</span>
        <span>性别</span>
        <span>医院</span>
        <span>术后时间</span>
        ${imageTypes.map((type) => `<span>${type}</span>`).join("")}
        <span>操作</span>
      </div>
      <div class="record-list">
        ${list.map((record, index) => `
          <article class="record-card neuro-record-card">
            <div class="record-field"><span>编号</span><strong>${record.subjectId}</strong></div>
            <div class="record-field"><span>性别</span><strong>${record.gender}</strong></div>
            <div class="record-field"><span>医院</span><strong>${record.hospital}</strong></div>
            <div class="record-field"><span>术后时间</span><strong>${record.postOpTime}</strong></div>
            ${imageTypes.map((type) => `
              <button class="image-preview-button" data-image-preview="${index}" data-image-type="${type}">查看</button>
            `).join("")}
            <button class="link-button" data-detail="${index}">详情</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function neuroImageTypes() {
  return ["FR", "SNR", "RMS", "Shank Quality", "Channel Quality"];
}

function renderDeviceRecordList(list) {
  el.contentBody.innerHTML = `
    <div class="record-list-shell device-record-list-shell">
      <div class="record-list-header device-record-list-header">
        <span>编号</span>
        <span>性别</span>
        <span>医院</span>
        <span>异常情况</span>
        <span>操作</span>
      </div>
      <div class="record-list">
        ${list.map((record, index) => `
          <article class="record-card device-record-card">
            <div class="record-field"><span>编号</span><strong>${record.subjectId}</strong></div>
            <div class="record-field"><span>性别</span><strong>${record.gender}</strong></div>
            <div class="record-field"><span>医院</span><strong>${record.hospital}</strong></div>
            <div class="record-field"><span>异常情况</span><strong>${deviceAbnormalCount(index)}</strong></div>
            <button class="link-button" data-contact-user="${record.subjectId}">联系用户</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderPersonalInfoRecordList(list) {
  el.contentBody.innerHTML = `
    <div class="record-list-shell personal-record-list-shell">
      <div class="record-list-header personal-record-list-header">
        <span>编号</span>
        <span>性别</span>
        <span>医院</span>
        <span>术后时间</span>
        <span>植入位置</span>
        <span>操作</span>
      </div>
      <div class="record-list">
        ${list.map((record, index) => `
          <article class="record-card personal-record-card">
            <div class="record-field"><span>编号</span><strong>${record.subjectId}</strong></div>
            <div class="record-field"><span>性别</span><strong>${record.gender}</strong></div>
            <div class="record-field"><span>医院</span><strong>${record.hospital}</strong></div>
            <div class="record-field"><span>术后时间</span><strong>${record.postOpTime}</strong></div>
            <div class="record-field"><span>植入位置</span><strong>${personalImplantLocation(record, index)}</strong></div>
            <button class="link-button" data-detail="${index}">详情</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderAlgorithmRecordList(list) {
  el.contentBody.innerHTML = `
    <div class="record-list-shell algorithm-record-list-shell">
      <div class="record-list-header algorithm-record-list-header">
        <span>编号</span>
        <span>性别</span>
        <span>医院</span>
        <span>术后时间</span>
        <span>当前使用模型</span>
        <span>R²</span>
        <span>操作</span>
      </div>
      <div class="record-list">
        ${list.map((record, index) => `
          <article class="record-card algorithm-record-card">
            <div class="record-field"><span>编号</span><strong>${record.subjectId}</strong></div>
            <div class="record-field"><span>性别</span><strong>${record.gender}</strong></div>
            <div class="record-field"><span>医院</span><strong>${record.hospital}</strong></div>
            <div class="record-field"><span>术后时间</span><strong>${record.postOpTime}</strong></div>
            <div class="record-field"><span>当前使用模型</span><strong>${currentModelName(index)}</strong></div>
            <div class="record-field"><span>R²</span><strong>${algorithmMetricOne(index)}</strong></div>
            <button class="link-button" data-detail="${index}">详情</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderTrainingConfigRecordList(list) {
  el.contentBody.innerHTML = `
    <div class="record-list-shell training-record-list-shell">
      <div class="record-list-header training-record-list-header">
        <span>编号</span>
        <span>性别</span>
        <span>医院</span>
        <span>术后时间</span>
        <span>映射配置</span>
        <span>卡片配置</span>
        <span>训练策略</span>
        <span>校准策略</span>
        <span>操作</span>
      </div>
      <div class="record-list">
        ${list.map((record, index) => `
          <article class="record-card training-record-card">
            <div class="record-field"><span>编号</span><strong>${record.subjectId}</strong></div>
            <div class="record-field"><span>性别</span><strong>${record.gender}</strong></div>
            <div class="record-field"><span>医院</span><strong>${record.hospital}</strong></div>
            <div class="record-field"><span>术后时间</span><strong>${record.postOpTime}</strong></div>
            <div class="record-field"><span>映射配置</span><strong>${metricOneValue(record, index)}</strong></div>
            <div class="record-field"><span>卡片配置</span><strong>${metricTwoValue(record, index)}</strong></div>
            <div class="record-field"><span>训练策略</span><strong>${trainingStrategyValue(index)}</strong></div>
            <div class="record-field"><span>校准策略</span><strong>${calibrationStrategyValue(index)}</strong></div>
            <button class="link-button" data-detail="${index}">详情</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function currentModelName(index) {
  const models = ["Decoder v2.1", "Adaptive BCI v1.8", "IntentNet v3.0", "CursorControl v2.4", "ArmAssist v1.6", "WheelNav v2.2"];
  return models[index % models.length];
}

function algorithmMetricOne(index) {
  const values = ["96.8%", "94.2%", "97.5%", "92.9%", "95.6%", "98.1%"];
  return values[index % values.length];
}

function personalImplantLocation(record, index) {
  if (record.implantLocation && record.implantLocation !== "未知") return record.implantLocation;
  const locations = ["左侧运动皮层", "右侧运动皮层", "双侧运动皮层", "左侧感觉运动区", "右侧感觉运动区"];
  return locations[index % locations.length];
}

function deviceAbnormalCount(index) {
  const counts = ["1次", "2次", "0次", "1次", "3次", "2次", "1次", "0次"];
  return counts[index % counts.length];
}

function metricOneValue(record, index) {
  if (state.activeCategory === "userBehavior") {
    return behaviorMetricSummary(record).fluency;
  }
  if (state.activeCategory === "trainingConfig") {
    return trainingConfigChoice(index);
  }
  const values = ["92.6", "88.3", "76.9", "95.1", "81.4", "90.7", "84.2", "97.0"];
  return values[index % values.length];
}

function metricTwoValue(record, index) {
  if (state.activeCategory === "userBehavior") {
    return behaviorMetricSummary(record).reliability;
  }
  if (state.activeCategory === "trainingConfig") {
    const cards = ["基础卡片", "精细卡片", "组合卡片", "校准卡片", "自由卡片", "训练卡片"];
    return cards[index % cards.length];
  }
  const values = ["41.8", "37.5", "52.3", "46.9", "39.6", "55.1", "44.2", "48.7"];
  return values[index % values.length];
}

function trainingStrategyValue(index) {
  const values = ["标准训练", "渐进训练", "快速适配", "稳定训练", "强化训练", "低负荷训练"];
  return values[index % values.length];
}

function calibrationStrategyValue(index) {
  const values = ["自动校准", "手动校准", "日常校准", "快速校准", "精细校准", "复测校准"];
  return values[index % values.length];
}

function behaviorMetricSummary(record) {
  const previousType = state.detailDataType;
  const previousStart = state.detailDateRange.start;
  const previousEnd = state.detailDateRange.end;

  state.detailDataType = "all";
  state.detailDateRange.start = "";
  state.detailDateRange.end = "";

  try {
    const firstRow = detailRows(record)[0] || {};
    return {
      fluency: firstRow.fluency || "",
      reliability: firstRow.reliability || ""
    };
  } finally {
    state.detailDataType = previousType;
    state.detailDateRange.start = previousStart;
    state.detailDateRange.end = previousEnd;
  }
}

function behaviorDailyRows(row) {
  const month = row.collectMonth || "";
  const days = ["06", "14", "22"];
  return days.map((day, index) => {
    const successRate = Math.max(80, parseFloat(row.successRate) - index * 0.8).toFixed(2);
    const accuracy = Math.max(78, parseFloat(row.accuracy) - index * 0.7).toFixed(2);
    const reliability = Math.max(198, parseInt(row.reliability, 10) - index * 2);
    return {
      date: month ? `${month}-${day}` : shiftDate(state.selectedRecord.recordDate, index * 7),
      successRate: `${successRate}%`,
      accuracy: `${accuracy}%`,
      reliability: `${reliability} 通道`
    };
  });
}

function renderDetail() {
  const category = activeCategory();
  const record = state.selectedRecord;
  const rows = detailRows(record);
  const typeOptions = detailTypeOptions();
  const hideTypeSelector = shouldHideDetailTypeSelector();
  const hideDateRange = shouldHideDetailDateRange();
  const filterRowClass = detailFilterRowClass(hideTypeSelector, hideDateRange);
  const detailFilterContent = renderDetailFilterContent(typeOptions, hideTypeSelector, hideDateRange);
  el.contentBody.innerHTML = `
    <div class="detail-view">
      <div class="detail-toolbar">
        <div>
          <p class="eyebrow">详情页 / ${category.label}</p>
          <strong>${record.subjectId} · ${record.recordType}</strong>
        </div>
        <div class="detail-actions">
          <button class="secondary-button" data-back-list="true">返回列表</button>
          <button class="primary-button" data-export-current="true">导出当前记录</button>
        </div>
      </div>

      <div class="detail-meta-line">
        <span>编号：${record.subjectId}</span>
        <span>医院：${record.hospital}</span>
        <span>术后时间：${record.postOpTime}</span>
        <span>记录类型：${record.recordType}</span>
      </div>

      ${detailFilterContent ? `<div class="detail-filter-row ${filterRowClass}">${detailFilterContent}</div>` : ""}

      ${renderDetailDataSection(rows, category)}

    </div>
  `;
}

function renderDetailFilterContent(typeOptions, hideTypeSelector, hideDateRange) {
  const dateFilter = state.activeCategory === "userBehavior" ? renderPostOpMonthSelect() : hideDateRange ? "" : `
    <label class="detail-date-range">
      <span>日期范围</span>
      <div>
        <input data-detail-date="start" type="date" value="${state.detailDateRange.start}" />
        <input data-detail-date="end" type="date" value="${state.detailDateRange.end}" />
      </div>
    </label>
  `;
  const typeFilter = hideTypeSelector ? "" : `
    <label class="detail-select">
      <span>数据类型</span>
      <select data-detail-type="true">
        <option value="all" ${state.detailDataType === "all" ? "selected" : ""}>全部数据</option>
        ${typeOptions.map((option) => `
          <option value="${option}" ${state.detailDataType === option ? "selected" : ""}>${option}</option>
        `).join("")}
      </select>
    </label>
  `;
  return `${dateFilter}${typeFilter}`.trim();
}

function renderPostOpMonthSelect() {
  return `
    <label class="detail-select post-op-month-select">
      <span>术后月份</span>
      <select data-detail-post-op-month="true">
        ${postOpMonthOptions().map((option) => `
          <option value="${option.value}" ${state.detailPostOpMonth === option.value ? "selected" : ""}>${option.label}</option>
        `).join("")}
      </select>
    </label>
  `;
}

function postOpMonthOptions() {
  return [
    { value: "1", label: "术后第一个月" },
    { value: "2", label: "术后第二个月" },
    { value: "3", label: "术后第三个月" },
    { value: "4", label: "术后第四个月" },
    { value: "5", label: "术后第五个月" },
    { value: "6", label: "术后第六个月" }
  ];
}

function renderDetailDataSection(rows, category) {
  if (state.activeCategory === "personalInfo") {
    const info = personalInfoSummary(state.selectedRecord);
    return `
      <section class="profile-info-strip">
        <div>
          <span>年龄</span>
          <strong>${info.age}</strong>
        </div>
        <div>
          <span>性别</span>
          <strong>${info.gender}</strong>
        </div>
        <div>
          <span>手术记录</span>
          <strong>${info.surgeryRecord}</strong>
        </div>
        <div>
          <span>植入定位信息</span>
          <strong>${info.implantLocation}</strong>
        </div>
      </section>
      <section class="surgery-record-panel">
        <div class="surgery-record-header">
          <h3>手术记录</h3>
          <label class="upload-button">
            上传附件
            <input data-surgery-upload="true" type="file" accept=".doc,.docx,.pdf,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png" />
          </label>
        </div>
        <div class="surgery-record-box">
          <span>支持 Word / PDF / PNG 格式附件</span>
        </div>
      </section>
    `;
  }

  if (state.activeCategory === "userBehavior") {
    return `
      <section class="data-strip-list">
        <div class="data-strip-head behavior-detail-strip-head">
          <span></span>
          <span>日期</span>
          <span>脑控成功率</span>
          <span>脑控流畅度指标</span>
          <span>任务清单准确率</span>
          <span>器械可靠性</span>
          <span>平均每月器械使用时长</span>
          <span>操作</span>
          <span>临床报告</span>
        </div>
        ${rows.map((row) => `
          <div class="data-strip behavior-detail-strip">
            <input type="checkbox" data-row-select="${row.id}" ${state.selectedDetailRows.includes(row.id) ? "checked" : ""} />
            <span>${row.collectMonth}</span>
            <span>${row.successRate}</span>
            <span>${row.fluency}</span>
            <span>${row.accuracy}</span>
            <span>${row.reliability}</span>
            <span>${row.monthlyUsage}</span>
            <button class="link-button" data-row-action="${row.id}">${row.action}</button>
            <button class="link-button" data-export-current="true">导出</button>
          </div>
          ${state.expandedDataRow === row.id ? behaviorDailyRows(row).map((dayRow) => `
            <div class="data-row-detail behavior-row-detail">
              <div><span>日期</span><strong>${dayRow.date}</strong></div>
              <div><span>脑控成功率</span><strong>${dayRow.successRate}</strong></div>
              <div><span>任务清单准确率</span><strong>${dayRow.accuracy}</strong></div>
              <div><span>器械可靠性</span><strong>${dayRow.reliability}</strong></div>
              <button class="secondary-button" data-export-current="true">导出该数据</button>
            </div>
          `).join("") : ""}
        `).join("")}
      </section>
    `;
  }

  if (state.activeCategory === "algorithmModel") {
    const sortedRows = rows
      .map((row, originalIndex) => ({ row, originalIndex }))
      .sort((a, b) => b.row.collectDate.localeCompare(a.row.collectDate));

    return `
      <section class="data-strip-list">
        <div class="data-strip-head model-detail-strip-head">
          <span></span>
          <span>采集日期</span>
          <span>使用模型</span>
          <span>R²</span>
          <span>操作</span>
        </div>
        ${sortedRows.map(({ row, originalIndex }) => `
          <div class="data-strip model-detail-strip">
            <input type="checkbox" data-row-select="${row.id}" ${state.selectedDetailRows.includes(row.id) ? "checked" : ""} />
            <span>${row.collectDate}</span>
            <span>${currentModelName(originalIndex)}</span>
            <span>${algorithmMetricOne(originalIndex)}</span>
            <button class="link-button" data-model-download="${currentModelName(originalIndex)}">下载</button>
          </div>
        `).join("")}
      </section>
    `;
  }

  if (state.activeCategory === "deviceManagement") {
    return `
      <section class="data-strip-list">
        <div class="data-strip-head device-detail-strip-head">
          <span></span>
          <span>采集日期</span>
          <span>主板电压</span>
          <span>主板电流</span>
          <span>主板温度</span>
          <span>SHT45 温湿度</span>
          <span>WF280A 气压/温度</span>
          <span>操作</span>
        </div>
        ${rows.map((row) => `
          <div class="data-strip device-detail-strip">
            <input type="checkbox" data-row-select="${row.id}" ${state.selectedDetailRows.includes(row.id) ? "checked" : ""} />
            <span>${row.collectDate}</span>
            <span>${row.boardVoltage}</span>
            <span>${row.boardCurrent}</span>
            <span>${row.boardTemperature}</span>
            <span>${row.sht45}</span>
            <span>${row.wf280a}</span>
            <button class="link-button" data-row-action="${row.id}">${row.action}</button>
          </div>
          ${state.expandedDataRow === row.id ? `
            <div class="data-row-detail">
              <div><span>数据来源</span><strong>${category.label}</strong></div>
              <div><span>主板温度</span><strong>${row.boardTemperature}</strong></div>
              <div><span>SHT45</span><strong>${row.sht45}</strong></div>
              <div><span>WF280A</span><strong>${row.wf280a}</strong></div>
              <button class="secondary-button" data-export-current="true">导出该数据</button>
            </div>
          ` : ""}
        `).join("")}
      </section>
    `;
  }

  if (state.activeCategory === "neuroPhysiology") {
    return `
      <section class="data-strip-list">
        <div class="data-strip-head neuro-detail-strip-head">
          <span></span>
          <span>采集日期</span>
          <span>Raw</span>
          <span>binCount</span>
          <span>sbp</span>
          <span>操作</span>
        </div>
        ${rows.map((row, index) => `
          <div class="data-strip neuro-detail-strip">
            <input type="checkbox" data-row-select="${row.id}" ${state.selectedDetailRows.includes(row.id) ? "checked" : ""} />
            <span>${row.collectDate}</span>
            <button class="image-preview-button" data-image-preview="${index}" data-image-type="Raw">查看</button>
            <button class="image-preview-button" data-image-preview="${index}" data-image-type="binCount">查看</button>
            <button class="image-preview-button" data-image-preview="${index}" data-image-type="sbp">查看</button>
            <button class="link-button" data-row-action="${row.id}">详情</button>
          </div>
          ${state.expandedDataRow === row.id ? `
            <div class="data-row-detail neuro-row-detail">
              <div class="neuro-segment-table">
                <div class="neuro-segment-head">
                  <span>采集时间段</span>
                  <span>Raw</span>
                  <span>binCount</span>
                  <span>sbp</span>
                </div>
                ${neuroSegmentRows(index).map((segment) => `
                  <div class="neuro-segment-row">
                    <strong>${segment.range}</strong>
                    <strong>${segment.raw}</strong>
                    <strong>${segment.binCount}</strong>
                    <strong>${segment.sbp}</strong>
                  </div>
                `).join("")}
              </div>
              <button class="secondary-button" data-export-current="true">导出该数据</button>
            </div>
          ` : ""}
        `).join("")}
      </section>
    `;
  }

  if (state.activeCategory === "trainingConfig") {
    return `
      <section class="data-strip-list">
        <div class="data-strip-head training-detail-strip-head">
          <span></span>
          <span>采集日期</span>
          <span>数据类型</span>
          <span>操作</span>
        </div>
        ${rows.map((row, index) => `
          <div class="data-strip training-detail-strip">
            <input type="checkbox" data-row-select="${row.id}" ${state.selectedDetailRows.includes(row.id) ? "checked" : ""} />
            <span>${row.collectDate}</span>
            <span>${row.dataType}</span>
            <button class="link-button" data-row-action="${row.id}">查看历史</button>
          </div>
          ${state.expandedDataRow === row.id ? `
            <div class="data-row-detail training-history-detail">
              <div class="training-history-table">
                <div class="training-history-head">
                  <span>历史日期</span>
                  <span>配置选择</span>
                </div>
                ${trainingHistoryRows(row.collectDate, index).map((history) => `
                  <div class="training-history-row">
                    <strong>${history.date}</strong>
                    <strong>${history.choice}</strong>
                  </div>
                `).join("")}
              </div>
              <button class="secondary-button" data-export-current="true">导出该数据</button>
            </div>
          ` : ""}
        `).join("")}
      </section>
    `;
  }

  return `
    <section class="data-strip-list">
      <div class="data-strip-head">
        <span></span>
        <span>采集日期</span>
        <span>数据类型</span>
        <span>可靠通道数量</span>
        <span>信号质量等级</span>
        <span>是否存在异常</span>
        <span>操作</span>
      </div>
      ${rows.map((row) => `
        <div class="data-strip">
          <input type="checkbox" data-row-select="${row.id}" ${state.selectedDetailRows.includes(row.id) ? "checked" : ""} />
          <span>${row.collectDate}</span>
          <span>${row.dataType}</span>
          <span>${row.reliableChannels}</span>
          <span>${row.qualityLevel}</span>
          <span>${row.hasAbnormal}</span>
          <button class="link-button" data-row-action="${row.id}">${row.action}</button>
        </div>
        ${state.expandedDataRow === row.id ? `
          <div class="data-row-detail">
            <div><span>数据来源</span><strong>${category.label}</strong></div>
            <div><span>采集日期</span><strong>${row.collectDate}</strong></div>
            <div><span>数据类型</span><strong>${row.dataType}</strong></div>
            <div><span>信号质量</span><strong>${row.qualityLevel}</strong></div>
            <button class="secondary-button" data-export-current="true">导出该数据</button>
          </div>
        ` : ""}
      `).join("")}
    </section>
  `;
}

function personalInfoSummary(record) {
  const ageMap = {
    "18-35岁": "32 岁",
    "36-55岁": "48 岁",
    "56岁以上": "61 岁"
  };
  return {
    age: ageMap[record.ageGroup] || "未录入",
    gender: record.gender,
    surgeryRecord: "已归档",
    implantLocation: record.implantLocation
  };
}

function neuroRawValue(index) {
  const values = ["98.2%", "97.6%", "96.9%", "98.8%", "95.7%", "97.3%"];
  return values[index % values.length];
}

function neuroBinCountValue(index) {
  const values = ["24 组", "22 组", "25 组", "23 组", "21 组", "24 组"];
  return values[index % values.length];
}

function neuroSbpValue(index) {
  const values = ["0.82", "0.79", "0.85", "0.81", "0.77", "0.83"];
  return values[index % values.length];
}

function neuroCollectTimeRange(index) {
  const ranges = ["10:00-12:00", "13:30-15:00", "15:20-16:40", "09:30-11:10", "14:00-15:30", "16:00-17:20"];
  return ranges[index % ranges.length];
}

function neuroSegmentRows(index) {
  const rangeGroups = [
    ["10:00-12:00", "14:00-15:20", "16:00-17:00"],
    ["09:30-10:40", "11:00-12:10"],
    ["13:00-14:20", "15:00-16:30", "17:00-17:40"]
  ];
  return rangeGroups[index % rangeGroups.length].map((range, segmentIndex) => {
    const valueIndex = index + segmentIndex;
    return {
      range,
      raw: neuroRawValue(valueIndex),
      binCount: neuroBinCountValue(valueIndex),
      sbp: neuroSbpValue(valueIndex)
    };
  });
}

function trainingConfigChoice(index) {
  const choices = ["手腕", "食指", "拇指", "肘部", "肩部", "掌心"];
  return choices[index % choices.length];
}

function trainingHistoryRows(dateText, index) {
  return [2, 5, 9].map((offset, historyIndex) => ({
    date: shiftDate(dateText, -offset),
    choice: trainingConfigChoice(index + historyIndex)
  }));
}

function detailRows(record) {
  const source = detailDataCatalog[state.activeCategory] || [];
  const dataTypes = detailTypeOptions();
  const rowCount = state.activeCategory === "userBehavior" ? 4 : state.activeCategory === "trainingConfig" ? dataTypes.length : Math.max(10, source.length);
  const rows = Array.from({ length: rowCount }, (_, index) => {
    if (state.activeCategory === "userBehavior") {
      const successRate = Math.max(82.6, 96.4 - index * 1.1).toFixed(2);
      const fluency = Math.max(65.2, 82.3 - index * 1.4).toFixed(2);
      const accuracy = Math.max(80.1, 94.8 - index * 1.2).toFixed(2);
      const reliability = Math.max(206, 238 - index * 3);
      const monthlyUsage = Math.max(30.5, 42.5 - index * 0.9).toFixed(2);
      return {
        id: `${record.subjectId}-${String(index + 1).padStart(3, "0")}`,
        collectDate: shiftDate(record.recordDate, index % 6),
        collectMonth: shiftMonth(record.recordDate, index + 1),
        dataType: "行为指标",
        successRate: `${successRate}%`,
        fluency: `${fluency} bits/min`,
        accuracy: `${accuracy}%`,
        reliability: `${reliability} 通道`,
        monthlyUsage: `${monthlyUsage} h`,
        action: "查看"
      };
    }
    if (state.activeCategory === "deviceManagement") {
      const dayOffset = index % 6;
      const collectDate = shiftDate(record.recordDate, dayOffset);
      return {
        id: `${record.subjectId}-${String(index + 1).padStart(3, "0")}`,
        collectDate,
        dataType: "硬件状态",
        boardVoltage: `${(3.30 + index * 0.01).toFixed(2)} V`,
        boardCurrent: `${120 + index * 3} mA`,
        boardTemperature: `${(36.8 + index * 0.3).toFixed(1)} ℃`,
        sht45: `${(27.1 + index * 0.2).toFixed(1)} ℃ / ${(48.2 + index * 0.5).toFixed(1)}%`,
        wf280a: `${(101.2 + index * 0.1).toFixed(1)} kPa / ${(26.9 + index * 0.2).toFixed(1)} ℃`,
        action: "查看"
      };
    }
    const reliableChannels = Math.max(196, 238 - index * 3);
    const abnormal = index % 4 === 3 ? "是" : "否";
    const dayOffset = index % 6;
    const collectDate = shiftDate(record.recordDate, dayOffset);
    const dataType = dataTypes[index % dataTypes.length];
    return {
      id: `${record.subjectId}-${String(index + 1).padStart(3, "0")}`,
      collectDate,
      dataType,
      reliableChannels: `${reliableChannels} 通道`,
      qualityLevel: reliableChannels >= 230 ? "优" : reliableChannels >= 215 ? "良" : "需复核",
      hasAbnormal: abnormal,
      action: "查看"
    };
  });

  if (state.activeCategory === "userBehavior") return rows;
  if (state.detailDataType === "all") return filterRowsByDetailDate(rows);
  return filterRowsByDetailDate(rows.filter((row) => row.dataType === state.detailDataType));
}

function filterRowsByDetailDate(rows) {
  return rows.filter((row) => {
    if (!row.collectDate) return true;
    const startMatched = !state.detailDateRange.start || row.collectDate >= state.detailDateRange.start;
    const endMatched = !state.detailDateRange.end || row.collectDate <= state.detailDateRange.end;
    return startMatched && endMatched;
  });
}

function detailTypeOptions() {
  if (state.activeCategory === "algorithmModel") return ["模型数据"];
  if (state.activeCategory === "userBehavior") return ["行为指标"];
  if (state.activeCategory === "trainingConfig") return ["卡片配置策略", "映射配置策略", "训练策略", "校准策略"];
  return ["Raw", "binCount", "sbp"];
}

function shouldHideDetailTypeSelector() {
  return ["neuroPhysiology", "algorithmModel", "userBehavior", "trainingConfig", "personalInfo", "deviceManagement"].includes(state.activeCategory);
}

function shouldHideDetailDateRange() {
  return ["trainingConfig", "personalInfo"].includes(state.activeCategory);
}

function detailFilterRowClass(hideTypeSelector, hideDateRange) {
  if (hideTypeSelector || hideDateRange) return "profile-filter-row";
  return "";
}

function shiftDate(dateText, offset) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateText;
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function shiftMonth(dateText, offset) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateText.slice(0, 7);
  date.setMonth(date.getMonth() + offset);
  return date.toISOString().slice(0, 7);
}

function renderExportHistory() {
  const exports = [
    ["2026-05-10 20:12", "神经生理数据", "Neuro_Raw_0001_2026_05_10.zip", "工程师"],
    ["2026-05-10 21:40", "算法模型数据", "Model_Decoder_0001_v2.1.json", "工程师"],
    ["2026-05-09 18:30", "个人信息", "Subject_Profile_0111.pdf", "CRC"],
    ["2026-05-08 17:42", "设备管理", "Device_Status_0123.csv", "工程师"]
  ];

  el.contentBody.innerHTML = `
    <div class="record-list-shell">
      <div class="export-list-header">
        <span>导出时间</span>
        <span>导出分类</span>
        <span>文件名</span>
        <span>导出人</span>
        <span>操作</span>
      </div>
      <div class="record-list">
        ${exports.map((item, index) => `
          <article class="export-row">
            <strong>${item[0]}</strong>
            <span>${item[1]}</span>
            <span>${item[2]}</span>
            <span>${item[3]}</span>
            <button class="link-button" data-download-export="${index}">下载</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function statusTag(status) {
  const cls = status.includes("待") || status.includes("停") ? "warning" : "success";
  return `<span class="status ${cls}">${status}</span>`;
}

function switchCategory(key) {
  state.activeCategory = key;
  state.mode = "list";
  state.selectedRecord = null;
  state.detailDataType = "all";
  state.detailPostOpMonth = "1";
  resetDetailDateRange();
  state.selectedDetailRows = [];
  state.expandedDataRow = "";
  resetFilters();
  render();
}

function showDetail(index) {
  state.selectedRecord = filteredRecords()[Number(index)];
  state.mode = "detail";
  state.detailDataType = "all";
  state.detailPostOpMonth = "1";
  resetDetailDateRange();
  state.selectedDetailRows = [];
  state.expandedDataRow = "";
  render();
}

function backToList() {
  state.mode = "list";
  state.selectedRecord = null;
  state.detailDataType = "all";
  state.detailPostOpMonth = "1";
  resetDetailDateRange();
  state.selectedDetailRows = [];
  state.expandedDataRow = "";
  render();
}

function showToast(text) {
  el.toast.textContent = text;
  el.toast.classList.add("show");
  window.setTimeout(() => el.toast.classList.remove("show"), 1600);
}

function openImageModal(recordIndex, imageType) {
  const record = filteredRecords()[Number(recordIndex)];
  if (!record) return;
  closeImageModal();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="image-modal-backdrop" data-image-modal-close="true">
      <section class="image-modal" role="dialog" aria-modal="true" aria-label="${imageType} 图像预览">
        <div class="image-modal-header">
          <div>
            <p class="eyebrow">图像预览</p>
            <h3>${imageType}</h3>
          </div>
          <button class="modal-close-button" data-image-modal-close="true">关闭</button>
        </div>
        <div class="image-modal-meta">
          <span>编号：${record.subjectId}</span>
          <span>医院：${record.hospital}</span>
          <span>术后时间：${record.postOpTime}</span>
          <span>记录类型：${record.recordType}</span>
        </div>
        <div class="image-preview-canvas">
          <strong>${imageType}</strong>
          <span>图像预览占位区</span>
        </div>
      </section>
    </div>
  `);
}

function closeImageModal() {
  document.querySelector(".image-modal-backdrop")?.remove();
}

function login() {
  const account = el.accountInput.value.trim();
  const password = el.passwordInput.value;
  const valid = account === "admin" && password === "123456";
  el.loginError.classList.toggle("hidden", valid);
  if (!valid) return;
  el.loginScreen.classList.add("hidden");
  el.appShell.classList.remove("hidden");
  showToast("登入成功");
}

function resetFilters() {
  state.filters = {
    subjectId: "all",
    hospital: "all",
    ageGroup: "all",
    gender: "all",
    postOpTime: "all",
    implantLocation: "all"
  };
}

function resetDetailDateRange() {
  state.detailDateRange = {
    start: "",
    end: ""
  };
}

el.categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) switchCategory(button.dataset.category);
});

el.contentBody.addEventListener("click", (event) => {
  const imagePreview = event.target.closest("[data-image-preview]");
  const detailButton = event.target.closest("[data-detail]");
  const backButton = event.target.closest("[data-back-list]");
  const exportButton = event.target.closest("[data-export-current]");
  const rowAction = event.target.closest("[data-row-action]");
  const downloadExport = event.target.closest("[data-download-export]");
  const contactUser = event.target.closest("[data-contact-user]");
  const modelDownload = event.target.closest("[data-model-download]");

  if (imagePreview) {
    event.stopPropagation();
    openImageModal(imagePreview.dataset.imagePreview, imagePreview.dataset.imageType);
    return;
  }
  if (detailButton) showDetail(detailButton.dataset.detail);
  if (contactUser) {
    showToast(`已发起联系用户：${contactUser.dataset.contactUser}`);
    return;
  }
  if (backButton) backToList();
  if (modelDownload) {
    showToast(`开始下载模型文件：${modelDownload.dataset.modelDownload}`);
    return;
  }
  if (exportButton) {
    const selectedCount = state.selectedDetailRows.length;
    showToast(selectedCount ? `已创建 ${selectedCount} 条选中数据导出任务` : "导出当前记录任务已创建");
  }
  if (rowAction) {
    state.expandedDataRow = state.expandedDataRow === rowAction.dataset.rowAction ? "" : rowAction.dataset.rowAction;
    render();
  }
  if (downloadExport) showToast("开始下载导出文件");
});

document.body.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-image-modal-close]");
  if (!closeButton) return;
  closeImageModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeImageModal();
});

document.querySelector(".content-panel").addEventListener("change", (event) => {
  const select = event.target.closest("[data-filter]");
  const detailType = event.target.closest("[data-detail-type]");
  const detailPostOpMonth = event.target.closest("[data-detail-post-op-month]");
  const rowSelect = event.target.closest("[data-row-select]");
  const surgeryUpload = event.target.closest("[data-surgery-upload]");
  if (surgeryUpload) {
    const fileName = surgeryUpload.files && surgeryUpload.files[0] ? surgeryUpload.files[0].name : "";
    showToast(fileName ? `已选择附件：${fileName}` : "请选择 Word / PDF / PNG 附件");
    return;
  }
  if (rowSelect) {
    state.selectedDetailRows = rowSelect.checked
      ? unique([...state.selectedDetailRows, rowSelect.dataset.rowSelect])
      : state.selectedDetailRows.filter((id) => id !== rowSelect.dataset.rowSelect);
    render();
    return;
  }
  if (detailType) {
    state.detailDataType = detailType.value;
    state.expandedDataRow = "";
    state.selectedDetailRows = [];
    render();
    return;
  }
  if (detailPostOpMonth) {
    state.detailPostOpMonth = detailPostOpMonth.value;
    state.expandedDataRow = "";
    state.selectedDetailRows = [];
    render();
    return;
  }
  if (!select) return;
  state.filters[select.dataset.filter] = select.value;
  state.mode = "list";
  state.selectedRecord = null;
  render();
});

document.querySelector(".content-panel").addEventListener("input", (event) => {
  const detailDate = event.target.closest("[data-detail-date]");
  if (!detailDate) return;
  state.detailDateRange[detailDate.dataset.detailDate] = detailDate.value;
  state.expandedDataRow = "";
  render();
});

el.backButton.addEventListener("click", backToList);
el.refreshButton.addEventListener("click", () => showToast("已刷新记录列表"));
el.exportHistoryButton.addEventListener("click", () => {
  state.mode = "exports";
  state.selectedRecord = null;
  render();
});
el.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  state.mode = "list";
  state.selectedRecord = null;
  render();
});

el.loginSubmitButton.addEventListener("click", login);
el.passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") login();
});
el.accountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") login();
});

render();
