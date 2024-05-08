import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import t

def barChars():
    # Read your data from file
    file = "combined_data_for_histogram.json"
    df = pd.read_json(file, orient='records')

    # Define your grouping categories
    groups = ["7JSON", "7XML", "100JSON", "100XML", "1000JSON", "1000XML", "2000JSON", "2000XML"]

    # Width of the bars
    barWidth = 0.3

    # Initialize lists to store bar data and error intervals for each group
    barsData = []
    barsInterval = []

    # Confidence level (e.g., 95%)
    confidence_level = 0.95

    # Degrees of freedom
    degrees_of_freedom = len(df) - 1

    # Iterate over groups and calculate mean and standard error for each group
    for group in groups:
        group_data = df[group]
        mean = group_data.mean() / 1000  # Convert from ms to seconds
        std_error = group_data.sem() / 1000  # Convert from ms to seconds
        interval = t.ppf((1 + confidence_level) / 2, degrees_of_freedom) * std_error
        barsData.append(mean)
        barsInterval.append(interval)

    # The x-position order of bars
    barsOrder = np.arange(len(groups) // 2)  # Adjusted for pairs of XML and JSON

    # Colours of bar charts
    colors = ["#fA00ff", "#6fff79"]

    # Opacity of colours
    Opacity = 1

    # Interval cap size
    intervalCapsize = 7

    # Plot bars for each group
    for i in range(0, len(groups), 2):
        plt.bar(barsOrder[i // 2] - barWidth / 2, barsData[i], color=colors[0],
                edgecolor='black', width=barWidth, yerr=barsInterval[i],
                capsize=intervalCapsize, alpha=Opacity, label="JSON" if i == 0 else "_nolegend_",
                zorder=3)  # Setting higher zorder for bars

        plt.bar(barsOrder[i // 2] + barWidth / 2, barsData[i + 1], color=colors[1],
                edgecolor='black', width=barWidth, yerr=barsInterval[i + 1],
                capsize=intervalCapsize, alpha=Opacity, label="XML" if i == 0 else "_nolegend_",
                zorder=3)  # Setting higher zorder for bars

    # Put a tick on the x-axis under each pair of bars and label it with data size
    plt.xticks(barsOrder, ["7", "100", "1000", "2000"])
    plt.ylabel('Average load time (seconds)')  # Change ylabel to seconds
    plt.xlabel('Number of articles')
    plt.title('Histogram with all measurements (long, confidence intervals)')
    plt.legend()

    # Set the y-axis limit
    plt.ylim(0, 0.35)  # Adjusted for seconds

    # Add grid lines along the y-axis at specific positions
    y_positions = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35]  # Specify the positions where you want the grid lines
    for position in y_positions:
        plt.axhline(y=position, color='lightgray', linestyle='-', zorder=2)  # Set zorder for grid lines

    plt.show()

barChars()