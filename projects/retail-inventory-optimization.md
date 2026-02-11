---
layout: project
title: Business Performance Analysis
subtitle: Inventory Optimization & Customer Retention
category: SQL & Cohort Analysis
description: Transformed fragmented raw data from the Adventure Works database into a centralized reporting framework.
technologies:
  - SQL (Window Functions)
  - Cohort Analysis
  - Data Visualization
source_url: "https://github.com/hdangnguyen/sql_1"
report_url: "#!"
---

<!-- Executive Summary -->
<div class="case-study-section">
    <h2 class="section-heading" id="executive-summary">Executive Summary</h2>
    <p class="mb-4">Transformed fragmented raw data from the Adventure Works database into a centralized reporting framework. By leveraging advanced SQL techniques, I addressed critical business challenges including <strong>Customer Retention (Cohort Analysis)</strong>, <strong>Inventory Efficiency (Stock-to-Sales Ratio)</strong>, and <strong>Market Growth Trends</strong>.</p>
</div>

<!-- Case Study 1 -->
<div class="case-study-section">
    <h2 class="section-heading" id="case-study-1">Case Study 1: Customer Retention Strategy (Cohort Analysis)</h2>
    <h3 class="sub-heading">The Business Challenge</h3>
    <p>The marketing department faced rising Customer Acquisition Costs (CAC) but lacked visibility into user lifecycle behavior. The key objective was to identify the exact "churn point" to shift focus from acquisition to retention.</p>

    <h3 class="sub-heading">My Approach</h3>
    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">1</span>
        <div>
            <strong>Data Partitioning:</strong> Engineered a cohort model using SQL Window Functions (`PARTITION BY`).
        </div>
    </div>
    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">2</span>
        <div>
            <strong>Tracking Activity:</strong> Tracked recurring customer activity over subsequent months to calculate dynamic retention rates.
        </div>
    </div>

    <h3 class="sub-heading">Solution</h3>
    <p class="mb-3">Below is the SQL query engineered to generate the cohort analysis dataset:</p>
    <div class="code-snippet-container shadow-sm">
        <div class="code-header">
            <span><i class="bi bi-code-slash me-2"></i>SQL Query</span>
            <span class="badge bg-light text-dark border">PostgreSQL</span>
        </div>
        <div id="sql-container-cs1" style="max-height: 200px; overflow: hidden; transition: max-height 0.5s ease; position: relative;">
            <pre class="mb-0"><code>WITH successful_order AS ( -- find successful order 
    SELECT  
      EXTRACT(MONTH FROM ModifiedDate) order_month,
      CustomerID customer_id
    FROM `adventureworks2019.Sales.SalesOrderHeader` 
    WHERE EXTRACT(YEAR FROM ModifiedDate) = 2014 AND Status = 5
    ORDER BY customer_id, order_month
),
rank_time_order AS ( -- find order time
    SELECT *,
      ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_month) order_time
    FROM successful_order
),
first_order AS ( -- find first order
    SELECT order_month AS month_join, customer_id
    FROM rank_time_order
    WHERE order_time = 1
),
find_month_diff AS ( -- join & find month_diff
    SELECT distinct order_month, month_join, a.customer_id,
      (order_month - month_join) month_diff_num
    FROM successful_order a
    INNER JOIN first_order b ON a.customer_id = b.customer_id
    ORDER BY month_join, order_month
)
SELECT -- format & count
  month_join,
  CONCAT('M-',month_diff_num) month_diff,
  COUNT(customer_id) customer_count
FROM find_month_diff
GROUP BY month_join, CONCAT('M-',month_diff_num)
ORDER BY month_join, month_diff</code></pre>
            <div id="sql-fade-cs1" style="position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(transparent, #f8f9fa);"></div>
        </div>
        <div class="text-center p-2 bg-light border-top">
            <button id="btn-toggle-cs1" class="btn btn-sm btn-outline-primary fw-bold rounded-pill px-4" onclick="toggleSQL('cs1')">
                See More <i class="bi bi-chevron-down ms-1"></i>
            </button>
        </div>
    </div>

    <h3 class="sub-heading">Key Insights</h3>
    <ul>
        <li class="mb-2"><strong>The "One-and-Done" Problem:</strong> Across all cohorts, <strong>&lt; 5%</strong> of customers return for a second purchase in Month 1 (M-1). Retention quality drops from <strong>3.8%</strong> (Jan) to <strong>1.1%</strong> (Jun).</li>
        <li class="mb-2"><strong>The "90-Day Resurrection" Pattern:</strong> Customers acquired in Jan/Feb showed a <strong>300% spike in activity at Month 3</strong> (12-13%), indicating quarterly cyclical demand.</li>
    </ul>

    <figure class="mt-4 mb-4">
        <div class="text-center">
            <img src="../assets/project 1/project 1 - image 1.png" class="img-fluid rounded shadow-sm border" alt="Cohort Retention Heatmap Analysis">
        </div>
        <figcaption class="figure-caption text-center">Figure 1: Retention rates dropping significantly after M-1 across all cohorts.</figcaption>
    </figure>

    <h3 class="sub-heading">Recommendation</h3>
    <div class="alert alert-light border-start border-primary border-4 shadow-sm" role="alert">
        <h5 class="alert-heading fw-bold fs-6"><i class="bi bi-lightbulb-fill text-warning me-2"></i>Actionable Strategy</h5>
        <p class="mb-2 small"><strong>Fix Onboarding (Day 0-30):</strong> Implement an automated "Welcome Series" email sequence focusing on product education immediately after purchase.</p>
        <p class="mb-0 small"><strong>Automate Re-stock (Day 85):</strong> Trigger a targeted "Maintenance & Upgrade" promotion exactly <strong>85 days</strong> after first purchase to capture the M-3 resurgence.</p>
    </div>
</div>

<!-- Case Study 2 -->
<div class="case-study-section">
    <h2 class="section-heading" id="case-study-2">Case Study 2: Inventory Optimization Strategy</h2>
    <h3 class="sub-heading">The Business Challenges</h3>
    <ul>
        <li class="mb-2"><strong>Rising Warehousing Costs:</strong> The company faced increasing storage fees due to stagnant inventory in specific categories.</li>
        <li class="mb-2"><strong>Lost Revenue:</strong> Despite high stock levels overall, popular items frequently experienced stockouts, leading to missed sales opportunities.</li>
        <li class="mb-2"><strong>Lack of Visibility:</strong> The supply chain team relied on static inventory counts, failing to account for real-time sales velocity (how fast products are actually selling).</li>
    </ul>

    <h3 class="sub-heading">My Approach</h3>
    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">1</span>
        <div>
            <strong>Shift to Dynamic Metrics:</strong> Instead of viewing "Stock" and "Sales" in isolation, I decided to correlate them to measure <strong>Capital Efficiency</strong>.
        </div>
    </div>
    <div class="d-flex align-items-start mb-3">
        <span class="badge bg-primary rounded-pill me-3 px-2 py-1">2</span>
        <div>
            <strong>The "Health Check" Logic:</strong> I defined a dynamic <strong>Stock-to-Sales Ratio</strong> to categorize inventory health:
            <ul class="mt-2 mb-0">
                <li><em>Ratio > 10.0:</em> Critical Overstock (Dead Capital).</li>
                <li><em>Ratio < 1.0:</em> High Stockout Risk (Lost Revenue).</li>
            </ul>
        </div>
    </div>

    <h3 class="sub-heading">Solution</h3>
    <p class="mb-3">I executed complex joins between supply and demand tables to aggregate data.</p>
    <div class="code-snippet-container shadow-sm">
        <div class="code-header">
            <span><i class="bi bi-code-slash me-2"></i>SQL Query</span>
            <span class="badge bg-light text-dark border">PostgreSQL</span>
        </div>
        <div id="sql-container-cs2" style="max-height: 200px; overflow: hidden; transition: max-height 0.5s ease; position: relative;">
            <pre class="mb-0"><code>WITH 
  sales_2011 AS( -- find sales infors in 2011 by joinning table
    SELECT 
      EXTRACT (MONTH FROM OrderDate) mth,
      EXTRACT (year FROM OrderDate) yr,
      detail.ProductID,
      p.Name,
      SUM(OrderQty) sales
    FROM `adventureworks2019.Sales.SalesOrderDetail` detail
    INNER JOIN `adventureworks2019.Sales.SalesOrderHeader` header
      ON detail.SalesOrderID = header.SalesOrderID
    INNER JOIN `adventureworks2019.Production.Product` p
      ON detail.ProductID = p.ProductID
    WHERE EXTRACT (year FROM OrderDate) = 2011
    GROUP BY 1, 2, 3, 4
    ORDER BY 1 DESC, sales
  ),

  stock_2011 AS ( -- find stock infors in 2011 by joinning table
    SELECT 
      EXTRACT(MONTH FROM o.ModifiedDate) mth,
      EXTRACT(YEAR FROM o.ModifiedDate) yr,
      o.ProductID,
      p.Name product_name,
      SUM(StockedQty) stock
    FROM `adventureworks2019.Production.WorkOrder` o
    INNER JOIN `adventureworks2019.Production.Product` p
      ON o.ProductID = p.ProductID
    WHERE EXTRACT(YEAR FROM o.ModifiedDate) = 2011 
    GROUP BY 1,2,3,4
    ORDER BY 1 DESC)

SELECT -- combined CTE & calculate the rate
  sa.mth,
  sa.yr,
  sa.ProductId,
  sa.Name,
  sales,
  stock,
  ROUND((stock/sales), 1) ratio
FROM sales_2011 sa
LEFT JOIN stock_2011 st
  ON sa.mth = st.mth
  AND sa.productID = st.productID
ORDER BY 1 DESC, 7 DESC</code></pre>
            <div id="sql-fade-cs2" style="position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(transparent, #f8f9fa);"></div>
        </div>
        <div class="text-center p-2 bg-light border-top">
            <button id="btn-toggle-cs2" class="btn btn-sm btn-outline-primary fw-bold rounded-pill px-4" onclick="toggleSQL('cs2')">
                See More <i class="bi bi-chevron-down ms-1"></i>
            </button>
        </div>
    </div>
    <ul>
        <li class="mb-2"><strong>Metric Calculation:</strong> Developed the query to calculate: <code>Ratio = End_of_Month_Stock / Monthly_Sales_Qty</code>.</li>
        <li class="mb-2"><strong>Visualization:</strong> Utilized Python (Seaborn) to generate an "Inventory Risk Alert" chart, highlighting the top 5 inefficient products in Red for immediate management attention.</li>
    </ul>

    <h3 class="sub-heading">Key Insights</h3>
    <ul>
        <li class="mb-2"><strong>Critical Overstock Discovery:</strong> In November 2011, the <strong>Road-650 Red, 62</strong> model reached an alarming ratio of <strong>56.0</strong> (56 units in stock vs. only 1 sold). This indicates over <strong>4 years of excess supply</strong> sitting idle at the current sales velocity.</li>
        <li class="mb-2"><strong>Stockout Risks:</strong> Conversely, the <strong>Road-150</strong> series frequently dropped to a ratio of <strong>0.1</strong> (e.g., Stock 4 vs. Demand 28), signaling a severe inability to fulfill customer orders during peak months.</li>
    </ul>

    <figure class="mt-4 mb-4">
        <div class="text-center">
            <img src="../assets/project 1/project 1 - image 2.png" class="img-fluid rounded shadow-sm border" alt="Cohort Retention Heatmap Analysis">
        </div>
        <figcaption class="figure-caption text-center">Figure 1: Retention rates dropping significantly after M-1 across all cohorts.</figcaption>
    </figure>

    <h3 class="sub-heading">Recommendations</h3>
    <div class="alert alert-light border-start border-primary border-4 shadow-sm" role="alert">
        <h5 class="alert-heading fw-bold fs-6"><i class="bi bi-lightbulb-fill text-warning me-2"></i>Actionable Strategy</h5>
        <p class="mb-2 small"><strong>Liquidation Strategy:</strong> Immediately halt procurement for the "Road-650 Red" series. Launch a <strong>20% Clearance Sale</strong> to release trapped working capital and free up warehouse space.</p>
        <p class="mb-0 small"><strong>Automated Reordering:</strong> Implement a dynamic alert system. Trigger a priority restock order whenever the Stock-to-Sales Ratio drops <strong>below 1.5</strong> to prevent future revenue loss.</p>
    </div>
</div>
