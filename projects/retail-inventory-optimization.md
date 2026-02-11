---
layout: project
title: Retail Inventory Optimization
category: Data Cleaning & Analysis
subtitle: Analyzed 2 years of inventory data to identify stockout patterns and slow-moving items, proposing a new reorder strategy.
description: Retail Inventory Optimization using SQL
technologies:
  - SQL (PostgreSQL)
  - Excel
  - Tableau
source_url: "#!"
report_url: "#!"
---

<!-- 1. Executive Summary -->
<div class="case-study-section">
    <h2 class="fw-bolder text-gradient d-inline-block mb-4">Executive Summary</h2>
    <p class="fs-5 mb-4">The client, a mid-sized retail chain, faced frequent stockouts of high-demand items 
        while simultaneously holding excess inventory of slow-moving goods. By analyzing two years of sales 
        and inventory data, I identified optimal reorder points and safety stock levels, reducing stockouts by 20%.</p>

    <!-- Key Metrics Grid -->
    <div class="row g-4 mb-4">
        <div class="col-md-6">
            <div class="metric-card">
                <h3 class="fw-bold text-primary mb-1">20% Reduction</h3>
                <div class="small text-muted">Stockout Frequency</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="metric-card">
                <h3 class="fw-bold text-primary mb-1">$15k Saved</h3>
                <div class="small text-muted">Projected Annual Savings</div>
            </div>
        </div>
    </div>
</div>

<!-- 2. Business Problem -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">The Business Problem</h3>
    <p>Inventory mismanagement was leading to lost sales opportunities and tied-up capital. The existing reorder process was manual and reactive.</p>
    <ul>
        <li>Question 1: Which products are most prone to stockouts?</li>
        <li>Question 2: What is the optimal safety stock level for each SKU?</li>
        <li>Question 3: Which items are "dead stock" and should be liquidated?</li>
    </ul>
</div>

<!-- 3. Methodology & Approach -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">My Approach</h3>
    <p>I utilized SQL for data extraction and transformation, followed by analysis in Excel and visualization in Tableau.</p>

    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">1</span>
        <div>
            <strong>Data Extraction (SQL):</strong> Wrote complex queries to join sales, inventory, and product tables. Calculated daily run rates and lead time variability.
        </div>
    </div>
    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">2</span>
        <div>
            <strong>Safety Stock Calculation:</strong> Implemented a formula based on demand variability and lead time to determine dynamic safety stock levels.
        </div>
    </div>
    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">3</span>
        <div>
            <strong>Visualization:</strong> Created a Tableau dashboard to highlight critical items requiring immediate reorder or liquidation.
        </div>
    </div>
</div>

<!-- 4. Key Insights & Visuals -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">Key Insights & SQL Snippets</h3>
    <p class="mb-4">Here is an example of the SQL query used to identify slow-moving inventory:</p>

    <div class="card bg-light border-0 mb-4">
        <div class="card-body">
<pre class="m-0"><code>SELECT 
    p.product_name,
    SUM(s.quantity) as total_sold_last_12m,
    i.current_stock
FROM products p
JOIN sales s ON p.product_id = s.product_id
JOIN inventory i ON p.product_id = i.product_id
WHERE s.sale_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
GROUP BY p.product_name, i.current_stock
HAVING SUM(s.quantity) < 10 AND i.current_stock > 50
ORDER BY i.current_stock DESC;</code></pre>
        </div>
    </div>

    <h5 class="fw-bold">What does this tell us?</h5>
    <p>This query isolates products that have sold fewer than 10 units in the last year but still have significant stock on hand, flagging them as candidates for clearance sales.</p>
</div>

<!-- 5. Recommendations -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">Recommendations</h3>
    <div class="alert alert-light border-start border-primary border-4" role="alert">
        <h5 class="alert-heading fw-bold"><i
                class="bi bi-lightbulb-fill text-warning me-2"></i>Actionable Strategy</h5>
        <p class="mb-0">Implement an automated reorder trigger in the ERP system based on the calculated safety stock levels. Initiate a quarterly clearance sale for identified slow-moving items to free up warehouse space.</p>
    </div>
</div>
