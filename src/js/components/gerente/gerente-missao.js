const chartData = [
  { name: "Jan", completed: 12 },
  { name: "Fev", completed: 15 },
  { name: "Mar", completed: 18 },
  { name: "Abr", completed: 22 },
  { name: "Mai", completed: 25 },
  { name: "Jun", completed: 20 },
];

function createBarChart() {
  const svg = document.getElementById('missionsChart');
  const tooltip = document.getElementById('tooltip');
  if (!svg) return;

  const containerRect = svg.parentElement.getBoundingClientRect();
  const margin = { top: 20, right: 20, bottom: 30, left: 30 };
  const width = containerRect.width - margin.left - margin.right;
  const height = containerRect.height - margin.top - margin.bottom;
  
  svg.innerHTML = '';
  svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
  svg.appendChild(g);

  const maxValue = Math.ceil(Math.max(...chartData.map(d => d.completed)) / 7) * 7 + 7;
  
  const xScale = width / chartData.length;
  const yScale = height / maxValue;

  for (let i = 0; i <= maxValue; i += 7) {
    if(i > maxValue || i > 35) continue;
    const y = height - (i * yScale);
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', y);
    line.setAttribute('x2', width);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', '#e9ecef');
    line.setAttribute('stroke-width', '1');
    g.appendChild(line);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '-8');
    text.setAttribute('y', y + 4);
    text.setAttribute('text-anchor', 'end');
    text.setAttribute('font-size', '12');
    text.setAttribute('fill', '#aaa');
    text.textContent = i;
    g.appendChild(text);
  }

  chartData.forEach((data, index) => {
    const barGroupX = (index * xScale) + (xScale * 0.15);
    const barWidth = xScale * 0.7;
    
    const completedHeight = data.completed * yScale;
    const completedBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    completedBar.setAttribute('x', barGroupX);
    completedBar.setAttribute('y', height - completedHeight);
    completedBar.setAttribute('width', barWidth);
    completedBar.setAttribute('height', completedHeight);
    completedBar.setAttribute('fill', '#27ae60');
    completedBar.setAttribute('rx', '4');
    completedBar.setAttribute('ry', '4');
    
    completedBar.addEventListener('mouseenter', (e) => showTooltip(e, `${data.name}: ${data.completed} concluídas`));
    completedBar.addEventListener('mouseleave', hideTooltip);
    completedBar.addEventListener('mousemove', (e) => moveTooltip(e));
    g.appendChild(completedBar);

    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', barGroupX + barWidth / 2);
    xLabel.setAttribute('y', height + 20);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('font-size', '12');
    xLabel.setAttribute('fill', '#888');
    xLabel.textContent = data.name;
    g.appendChild(xLabel);
  });
}

function showTooltip(event, text) {
  const tooltip = document.getElementById('tooltip');
  tooltip.textContent = text;
  tooltip.classList.add('visible');
  moveTooltip(event);
}

function hideTooltip() {
  const tooltip = document.getElementById('tooltip');
  tooltip.classList.remove('visible');
}

function moveTooltip(event) {
  const tooltip = document.getElementById('tooltip');
  const svgRect = event.target.closest('svg').getBoundingClientRect();
  tooltip.style.left = (event.clientX - svgRect.left) + 'px';
  tooltip.style.top = (event.clientY - svgRect.top - 10) + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
  createBarChart();
  window.addEventListener('resize', createBarChart);
});