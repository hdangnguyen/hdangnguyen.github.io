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
source_url: "#!"
report_url: "#!"
---

<!-- Executive Summary -->
<div class="case-study-section">
    <h2 class="fw-bolder text-gradient d-inline-block mb-4">Executive Summary</h2>
    <p class="fs-5 mb-4">Transformed fragmented raw data from the Adventure Works database into a centralized reporting framework. By leveraging advanced SQL techniques, I addressed critical business challenges including <strong>Customer Retention (Cohort Analysis)</strong>, <strong>Inventory Efficiency (Stock-to-Sales Ratio)</strong>, and <strong>Market Growth Trends</strong>. The analysis provided actionable insights to reduce warehousing costs and optimize marketing spend.</p>
</div>

<!-- Case Study 1: Situation -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">Case Study 1: Customer Retention Strategy (Cohort Analysis)</h3>
    <h4 class="fw-bold mt-4 mb-2">The Business Challenge (SITUATION)</h4>
    <p>The marketing department faced rising Customer Acquisition Costs (CAC) but lacked visibility into user lifecycle behavior. The key objective was to identify the exact "churn point" to shift focus from acquisition to retention.</p>

    <h4 class="fw-bold mt-4 mb-2">Technical Solution (TASK)</h4>
    <p>I engineered a <strong>Cohort Analysis</strong> model using SQL Window Functions. By partitioning customers based on their initial purchase month (Month Join), I tracked their recurring activity over subsequent months to calculate the retention rate dynamically.</p>
</div>

<!-- SQL Action -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">SQL Implementation (ACTION)</h3>
    <p class="mb-4">Here is the SQL query used to generate the cohort analysis:</p>
    <div class="card bg-light border-0 mb-4">
        <div class="card-body">
<pre class="m-0"><code>
WITH 
  successful_order AS ( -- find successful order 
    SELECT  
      EXTRACT(MONTH FROM ModifiedDate) order_month,
      CustomerID customer_id
    FROM `adventureworks2019.Sales.SalesOrderHeader` 
    WHERE EXTRACT(YEAR FROM ModifiedDate) = 2014
      AND Status = 5
    ORDER BY customer_id, order_month
  ),

  rank_time_order AS ( -- find order time
    SELECT
      *,
      ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_month) order_time
    FROM successful_order
  ),

  frist_order AS ( -- find first order
    SELECT 
      order_month AS month_join, 
      customer_id
    FROM rank_time_order
    WHERE order_time = 1
  ),

  find_month_diff AS ( -- join & find month_diff
    SELECT
      distinct order_month,
      month_join,
      a.customer_id,
      (order_month - month_join) month_diff_num
    FROM successful_order a
    INNER JOIN frist_order b
      ON a.customer_id = b.customer_id
    ORDER BY month_join, order_month
  )

SELECT -- format & count
  month_join,
  CONCAT('M-',month_diff_num) month_diff,
  COUNT(customer_id) customer_count
FROM find_month_diff
GROUP BY month_join, CONCAT('M-',month_diff_num)
ORDER BY month_join, month_diff
</code></pre>
        </div>
    </div>
</div>

<!-- Key Insights & Recommendations -->
<div class="case-study-section">
    <h3 class="fw-bold mb-3">Key Data Insights</h3>
    <ul>
        <li class="mb-2"><strong>The "One-and-Done" Problem:</strong> The data reveals a critical retention failure immediately after acquisition. Across all cohorts, <strong>< 5%</strong> of customers return for a second purchase in Month 1 (M-1). Furthermore, retention quality is degrading, dropping from <strong>3.8%</strong> in the January cohort to just <strong>1.1%</strong> in the June cohort.</li>
        <li class="mb-2"><strong>The "90-Day Resurrection" Pattern:</strong> Despite the initial churn, a significant behavioral anomaly was detected in Q1 cohorts. Customers acquired in Jan/Feb showed a <strong>300% spike in activity at Month 3</strong> (jumping from ~4% in M-2 to <strong>12-13%</strong> in M-3). This indicates a strong quarterly cyclical demand (likely maintenance or seasonal upgrades) specific to early-year buyers.</li>
    </ul>

    <h3 class="fw-bold mb-3 mt-5">Strategic Recommendations</h3>
     <div class="alert alert-light border-start border-primary border-4" role="alert">
        <h5 class="alert-heading fw-bold"><i class="bi bi-lightbulb-fill text-warning me-2"></i>Fix the Onboarding Experience (Day 0-30)</h5>
        <p class="mb-2">The steep drop-off at M-1 indicates a lack of post-purchase engagement.</p>
        <p class="mb-0"><strong>Action:</strong> Implement an automated "Welcome Series" email sequence focusing on product education and setup guides immediately after the first purchase to build habit-forming behavior.</p>
    </div>

    <div class="alert alert-light border-start border-primary border-4 mt-4" role="alert">
        <h5 class="alert-heading fw-bold"><i class="bi bi-lightbulb-fill text-warning me-2"></i>Automate "Re-stock" Campaigns (Day 85)</h5>
        <p class="mb-2">Capitalize on the M-3 resurgence.</p>
        <p class="mb-0"><strong>Action:</strong> Trigger a targeted "Maintenance & Upgrade" promotion exactly <strong>85 days</strong> after the first purchase. This preemptive move captures the high-intent traffic visible in the Jan/Feb cohorts.</p>
    </div>
</div>
